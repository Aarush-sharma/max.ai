import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
 import React, { SetStateAction } from 'react'
import { Icons } from "./icons";
import { Button } from "./button";
import { Input } from "./input";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import ChatTab from "./chat-tab";
interface savedchat {
    title:string,
    settitle:(value: SetStateAction<string>) => void,
    handleSave(): Promise<void>,
    clearChat: () => void,
    titles: string[],
    handleDeleteSavedChat: (index: number, title: string) => null | undefined,
    handleRetreiveChat: (title: string) => Promise<void>,
    isFetching: boolean,
    className?:string
}
 export default function SavedChatTab(props:savedchat) {
    const DialogClose = DialogPrimitive.Close;
   return (
    <div className={`flex flex-col space-y-4 md:order-2 sm:order-1 ${props.className}`}>
    <div className="flex items-center justify-center w-full space-x-2 pr-5">
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
                value={props.title}
                onChange={(e) => props.settitle(e.target.value)}
                placeholder="'phishing tips'?"
              />
            </div>
          </div>
          <DialogClose>
            <Button onClick={props.handleSave} className="gap-2">
              Submit
              <Icons.submit />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Button
        onClick={props.clearChat}
        variant="outline"
        title="Clear chat"
      >
        <Icons.clear />
      </Button>
    </div>
    <div className="border border-[hsl(240 3.7% 15.9%)] h-[74vh] rounded-md">
      <div className="h-[6vh] border-b border-[hsl(240 3.7% 15.9%)] flex justify-center items-center gap-2">
        Saved chats
        <CounterClockwiseClockIcon className="h-4 w-4" />
      </div>
      {props.titles.map((item, index) => (
        <div key={index}>
          <ChatTab
            isfetching={props.isFetching}
            title={item}
            index={index}
            delete={props.handleDeleteSavedChat}
            getchats={props.handleRetreiveChat}
          />
        </div>
      ))}
    </div>
  </div>
   )
 }
 