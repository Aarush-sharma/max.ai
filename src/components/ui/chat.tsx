"use client";

import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { Content } from "@google/generative-ai";
import { Icons } from "@/components/ui/icons";

const clearSymbols = (text: string) => {
  let clearedText = text.replace(/\*\*/g, "");
  clearedText = clearedText.replace(/\n/g, "<br>");

  return clearedText;
};

export default function Chat() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setValue("");
      const response = await axios.post("/api/chat", {
        prompt: value,
        history: history,
      });
      const modelValue = clearSymbols(response.data);
      setHistory([
        ...history,
        { role: "user", parts: [{ text: value }] },
        { role: "model", parts: [{ text: modelValue }] },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2 border border-[hsl(240 3.7% 15.9%)] h-[73vh]"></div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div className="h-[60vh] border border-[hsl(240 3.7% 15.9%)] overflow-auto">
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
                    </div>
                    <Textarea
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      placeholder="Try ' Write a tagline for an ice cream shop '"
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
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
