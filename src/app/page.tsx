import Main from "@/components/home";
import Navbar from "@/components/ui/navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <BackgroundBeams
        children={
          <div>
            <Navbar ></Navbar>
            <Main />
          </div>
        }
      />
    </div>
  );
}
