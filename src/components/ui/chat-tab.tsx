import React from "react";
import { Button } from "./button";
import { Icons } from "./icons";
interface tab {
  delete: (index: number, title: string) => void;
  getchats: (title: string) => void;
  title: string;
  isfetching: boolean;
  index: number;
}

export default function ChatTab(props: tab) {
  const deletchats = () => {
    props.delete(props.index,props.title)
  };
  const chatfetcher = ()=>{
    props.getchats(props.title)
  }
  return (
    <div  className="flex h-[7.5vh]  my-2 mx-2">
      <div className="border border-[hsl(240 3.7% 15.9%)] rounded-md w-full flex  px-1">
        {props.isfetching ? (
          <div className="flex w-full justify-center items-center">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>
          </div>
        ) : (
          <div className="items-center flex w-full">
            <Button
              className="w-full overflow-hidden flex justify-start"
              onClick={chatfetcher}
              title={props.title}
              disabled={props.isfetching}
              variant="ghost"
            ><p className="relative -left-2 pr-1">{props.title}</p></Button>
            <Button
              variant="ghost"
              title="delete chat"
              onClick={deletchats}
              disabled={props.isfetching}
              className="bg-[#09090b]"
            >
              <Icons.Archive></Icons.Archive>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
//
//
