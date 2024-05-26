import React, { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Content } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface operations {
  fcn: () => void;
  data: Content[];
}

export default function SavedChat(props: operations) {
  const [title, setTitle] = useState("");

  const {toast} =useToast();

  async function handleSave() {
    try{
    const res = axios.post("/api/chat/create",{
      title:title,
      history:props.data
    })
    toast({
      title: "saved successfully"
    });
    }catch(e){
      toast({
        title: "invalid session, Please log in or create account"
      });
    }
  }

  return (
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
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="'phishing tips'?" />
              </div>
            </div>
            <Button  onClick={handleSave} className="gap-2">
                Submit
                <Icons.submit></Icons.submit>
              </Button>
          </DialogContent>
        </Dialog>
        <Button onClick={props.fcn} variant="outline" title="Clear chat">
          <Icons.Archive />
        </Button>
      </div>
      <div className="border border-[hsl(240 3.7% 15.9%)] h-[74vh] rounded-md">hi</div>
      
    </div>
  );
}
