import Chat from "@/components/ui/chat";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

export default function Page(){
  return(
    <Chat/>
  )
}
