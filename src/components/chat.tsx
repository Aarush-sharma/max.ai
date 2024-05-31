"use client";

import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { Content } from "@google/generative-ai";
import { Icons } from "@/components/ui/icons";
import { useCookies } from "next-client-cookies";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { ChatSkeleton } from "./ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import prisma from "@/db";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import ChatTab from "./ui/chat-tab";
const clearSymbols = (text: string): string => {
  return text.replace(/\*\*/g, "").replace(/\n/g, "<br>");
};

export default function Chat() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const cookies = useCookies();
  const { toast } = useToast();
  const DialogClose = DialogPrimitive.Close;

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
      console.log(JSON.stringify(history));
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
  async function handleSave() {
    try {
      const res = axios.post("/api/chat/create", {
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
    const loadchats = async () => {
      const email = cookies.get("email");
      const res = await axios.get("api/chat/title", {
        params: {
          email: email,
        },
      });
      console.log(typeof(res.data));
      console.log(titles);
      
      if(typeof(res.data)==='string'){
        return null
      }
      setTitles(res.data);
    };
    loadchats();
  }, [isLoading]);
  const handleDeleteSavedChat = (index: number) => {
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
    setHistory([])
    setIsFetching(true);
  };
  const handleRetreiveChat = async (title:string) => {
    setIsFetching(true);
    setHistory([])
    const email = cookies.get("email") as string;
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
    <Tabs defaultValue="complete" className="flex-1">
      <div className="container h-full py-6">
        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
          <div className="hidden flex-col space-y-4 sm:flex md:order-2 ">
            <div className="flex items-center justify-center w-full space-x-2 pr-5 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    Save chat
                    <Icons.chat />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Set Title</DialogTitle>
                    <DialogDescription>
                      somethings are better to write yourself :)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid w-full gap-4">
                    <div className="grid w-full items-center gap-4">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="'phishing tips'?"
                      />
                    </div>
                  </div>
                  <DialogClose>
                    <Button onClick={handleSave} className="gap-2">
                      Submit
                      <Icons.submit></Icons.submit>
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <Button onClick={clearChat} variant="outline" title="Clear chat">
                <Icons.Archive />
              </Button>
            </div>
            <div className="border border-[hsl(240 3.7% 15.9%)] h-[74vh] rounded-md">
              <div className="h-[6vh] border-b border-[hsl(240 3.7% 15.9%)] flex justify-center items-center gap-2">
                Saved chats
                <CounterClockwiseClockIcon className="h-4 w-4" />
              </div>
              {titles.map((item, index) => (
                <div key={index}>
                  <ChatTab
                    isfetching={isFetching}
                    title={item}
                    index={index}
                    delete={handleDeleteSavedChat}
                    getchats={handleRetreiveChat}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:order-1">
            <TabsContent value="complete" className="mt-0 border-0 p-0">
              <div className="flex h-full flex-col space-y-4">
                <div className="h-[68vh] border border-[hsl(240 3.7% 15.9%)] overflow-auto p-4 rounded-md">
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
                <div className="flex justify-end">
                  <Textarea
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Try 'Write a tagline for an ice cream shop'"
                    className="min-h-[40px] flex-1 p-4 md:min-h-[70px] lg:min-h-[70px]"
                  />
                  <Button
                    onClick={handleSubmit}
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
  );
}
