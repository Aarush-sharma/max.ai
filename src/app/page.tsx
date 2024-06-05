import Main from "@/components/home";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Navbar></Navbar>
      <Main/>
    </div>
  );
}
