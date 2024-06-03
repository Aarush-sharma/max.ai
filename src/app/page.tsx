import Main from "@/components/home";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar></Navbar>
      <Main/>
    </div>
  );
}
