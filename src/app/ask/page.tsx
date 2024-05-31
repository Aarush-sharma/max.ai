

import Chat from "@/components/chat";
import Navbar from "@/components/ui/navbar";


export default function Page() {
  
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <Navbar  />
        <Chat />
      </div>
    </>
  );
}
