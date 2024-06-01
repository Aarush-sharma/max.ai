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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

function Navbar() {
  const router = ()=>{
    window.location.href = "/account"
  }
  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 ml-auto md:gap-2 lg:gap-4">
          <a href="/log-in" className={`${buttonVariants({ variant: "outline" })} ml-auto flex-1 sm:flex-initial`}>
            Log in
          </a>
          <ModeToggle></ModeToggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={router}>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
