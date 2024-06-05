"use client";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ModeToggle } from "@/components/ui/themetoggler";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "./use-toast";

interface nav {
  children?:  React.JSX.Element,
  
}
function Navbar(props:nav) {
  const cookies = useCookies();
  const {toast} = useToast();
  const pushclient = () => {
    window.location.href = "/account";
  };
  const logout = () =>{
 cookies.remove("token")
 window.location.href = "/";
 toast({
  title:"successfully logged out"
 })
  }
  return (
    <>
      <div className="w-full sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {/* image will be here */}
          <a
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Overview
          </a>
          <a
            href="/ask"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            AskAi
          </a>
          <Link
            href="https://github.com/Aarush-sharma/medicare.ai"
            className="text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            Github
          </Link>
          <a
            href="/account"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </a>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-6 text-lg font-medium">
              <a
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Overview
              </a>
              <a
                href="/ask"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                AskAi
              </a>
              <Link
                href="https://github.com/Aarush-sharma/medicare.ai"
                className="text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
              >
                Github
              </Link>
              <a
                href="/account"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Settings
              </a>
            </div>
            {props.children}
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 ml-auto md:gap-2 lg:gap-4">
          <Link
            href="/log-in"
            className={`${buttonVariants({
              variant: "outline",
            })} ml-auto  flex-initial`}
          >
            Log in
          </Link>
          <ModeToggle></ModeToggle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={pushclient}>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default Navbar;
