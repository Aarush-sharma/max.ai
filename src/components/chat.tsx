"use client";

import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Content } from "@google/generative-ai";
import { Icons } from "@/components/ui/icons";
import { useCookies } from "next-client-cookies";
import SavedChat from "./saved-chats";
import Navbar from "@/components/ui/navbar";
import { ChatSkeleton } from "./ui/loader";

const clearSymbols = (text: string): string => {
  return text.replace(/\*\*/g, "").replace(/\n/g, "<br>");
};

interface Message {
  role: "model" | "user";
  content: string[];
}

export default function Chat() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const cookies = useCookies();

  const handleSubmit = async () => {
    setIsLoading(true);
    setUsername(cookies.get("username") as string);
    const userMessage = { role: "user", parts: [{ text: value }] };
    setHistory([...history, userMessage]);

    try {
      const response = await axios.post("/api/chat", {
        prompt: value,
        history: history,
      });
      const modelValue = clearSymbols(response.data);
      const modelMessage = { role: "model", parts: [{ text: modelValue }] };

      setHistory([...history, userMessage, modelMessage]);

      setValue("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
  };

  return (
    <div className="hidden h-full flex-col md:flex">
      <Navbar />
      <Tabs defaultValue="complete" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <SavedChat />
            <div className="md:order-1">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <div className="h-[60vh] border border-[hsl(240 3.7% 15.9%)] overflow-auto p-4">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          item.role === "user"
                            ? "chat chat-end"
                            : "chat chat-start"
                        }`}
                      >
                        <span className="chat-header mb-2 text-xs">
                          {item.role === "user" ? username : "AI"}
                        </span>
                        <div
                          className={`chat-bubble ${
                            item.role === "user" ? "glass" : ""
                          }`}
                        >
                          <div>
                            {item.parts.map((part: any, i: number) => (
                              <p
                                key={i}
                                dangerouslySetInnerHTML={{ __html: part.text }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && <ChatSkeleton />}
                  </div>
                  <Textarea
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Try 'Write a tagline for an ice cream shop'"
                    className="min-h-[40px] flex-1 p-4 md:min-h-[70px] lg:min-h-[70px]"
                  />
                  <div className="flex items-center space-x-2">
                    <Button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Submit
                    </Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={clearChat}
                      variant="outline"
                      title="Clear chat"
                    >
                      <Icons.Archive />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

/*
{history.map((item, index) => (
                        <div key={index} className="p-2">
                          <strong>{item.role}:</strong>
                          {item.parts.map((part: any, i: any) => (
                            <p
                              key={i}
                              dangerouslySetInnerHTML={{ __html: part.text }}
                            />
                          ))}
                        </div>
                      ))}
*/
