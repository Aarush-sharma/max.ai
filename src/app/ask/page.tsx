import Chat from "@/components/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ai",
  description: "The AI Playground built using the components.",
};

export default function Page() {
  return <Chat />;
}
