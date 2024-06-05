"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Content } from "@google/generative-ai";
import { Icons } from "@/components/ui/icons";
import { useCookies } from "next-client-cookies";
import Navbar from "@/components/ui/navbar";
import * as jwt from "jsonwebtoken";
import { ChatSkeletonMain, ChatSkeletonMini } from "./ui/loader";
import "./ui/styles/scroll.css";
import { useToast } from "./ui/use-toast";

import SavedChatTab from "./ui/savedchat";

export interface DecodedToken {
  user_id: number;
  email: string;
  username: string;
}

export default function Chat() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [userName, setUsername] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const cookies = useCookies();
  const { toast } = useToast();
  const textRef = useRef<HTMLDivElement>(null);
  const tokenCookie = cookies.get("token") as string;
  const token = jwt.decode(tokenCookie) as DecodedToken;

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast({
            title: "Text copied to clipboard!",
          });
        })
        .catch((err) => {
          toast({
            title: `Failed to copy text: ${err}`,
          });
        });
    }
  };
  const clearSymbols = (text: string): string => {
    return text
      .replace(/\*\*/g, "")
      .replace(/\n/g, "<br>")
      .replace(
        /```(.*?)```/g,
        `<div  class=" bg-black mockup-code px-3">$1</div>`
      );
  };

  const createChatResponse = async () => {
    setIsLoading(true);
    setUsername(token.username);
    const userMessage = { role: "user", parts: [{ text: value }] };
    setHistory([...history, userMessage]);
    setValue("");
    try {
      const response = await axios.post("/api/chat", {
        prompt: value,
        history: history,
      });
      const modelValue = clearSymbols(response.data);
      const modelMessage = { role: "model", parts: [{ text: modelValue }] };

      setHistory([...history, userMessage, modelMessage]);
      console.log(JSON.stringify(history));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
  };
  async function handleSave() {
    try {
      axios.post("/api/chat/create", {
        title: title,
        history: history,
      });
      titles.push(title);
      toast({
        title: "saved successfully",
      });
    } catch (e) {
      toast({
        title: "invalid session, Please log in or create account",
      });
    }
  }
  useEffect(() => {
    const loadChats = async () => {
      const email = token.email;
      const res = await axios.get("api/chat/title", {
        params: { email: email },
      });
      if (typeof res.data !== "string") {
        setTitles(res.data.map((value: any) => value.title));
      }
    };
    loadChats();
  }, [isLoading]);

  const handleDeleteSavedChat = (index: number, title: string) => {
    setIsFetching(true);
    titles.splice(index, 1);
    try {
      axios.delete("api/chat/delete", {
        data: {
          history: history,
          title: title,
        },
      });
    } catch (err) {
      return null;
    }
    setHistory([]);
    setIsFetching(false);
  };
  const handleRetreiveChat = async (title: string) => {
    setIsFetching(true);
    setHistory([]);
    const email = token.email;
    try {
      const res = await axios.get("api/chat/get", {
        params: {
          title: title,
          email: email,
        },
      });
      console.log(res.data);
      setHistory(res.data);
    } catch (err) {
      toast({
        title: "something went wrong :(",
      });
    }
    setIsFetching(false);
  };

  return (
    <div className="h-full flex-col  md:flex">
      <Navbar
        children={
          <SavedChatTab
            title={title}
            titles={titles}
            handleDeleteSavedChat={handleDeleteSavedChat}
            handleRetreiveChat={handleRetreiveChat}
            handleSave={handleSave}
            settitle={setTitle}
            clearChat={clearChat}
            isFetching={isFetching}
            className="h-[55vh] mt-3"
          />
        }
      />
      <Tabs defaultValue="complete" className="flex-1">
        <div className="px-5 h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px] sm:grid-cols-1">
            <SavedChatTab
              title={title}
              titles={titles}
              handleDeleteSavedChat={handleDeleteSavedChat}
              handleRetreiveChat={handleRetreiveChat}
              handleSave={handleSave}
              settitle={setTitle}
              clearChat={clearChat}
              isFetching={isFetching}
              className="max-md:hidden"
            />
            <div className="md:order-1 sm:order-2">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <div className="h-[68vh] border border-[hsl(240 3.7% 15.9%)] invisible-scrollbar overflow-auto p-4 rounded-md">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          item.role === "user"
                            ? "chat chat-end"
                            : "chat chat-start"
                        }`}
                      >
                        <div>
                          <div>
                            <span className="chat-header mb-2 text-xs">
                              {item.role === "user" ? userName : "Max"}
                            </span>
                            <Button onClick={handleCopy} variant="ghost">
                              <Icons.copy />
                            </Button>
                          </div>
                          <div
                            className={`chat-bubble ${
                              item.role === "user" ? "glass" : ""
                            }`}
                          >
                            {item.parts.map((part, i) => (
                              <div
                                key={i}
                                ref={textRef}
                                dangerouslySetInnerHTML={{ __html: part.text! }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div>
                        <ChatSkeletonMain className=" max-md:hidden" />
                        <ChatSkeletonMini className="md:hidden w-[80vw]"/>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Textarea
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      placeholder="Try 'Write a tagline for an ice cream shop'"
                      className="min-h-[40px] flex-1 p-4 md:min-h-[70px] lg:min-h-[70px] invisible-scrollbar"
                    />
                    <Button
                      onClick={createChatResponse}
                      disabled={isLoading}
                      variant={"ghost"}
                      className="absolute mt-5 mr-5"
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.Send />
                      )}
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
