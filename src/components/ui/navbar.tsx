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
import { useState } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [SettingOption, setSttingOption] = useState(false);
  const urlCheck = () => {
    if (pathname.includes("/ask")) {
      setSttingOption(true);
    } else {
      setSttingOption(false);
    }
  };
  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {/* image will be here */}
          <a
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={urlCheck}
          >
            Overview
          </a>
          <a
            href="/ask"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={urlCheck}
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
            href="#"
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
                onClick={urlCheck}
              >
                Overview
              </a>
              <a
                href="/ask"
                className="text-muted-foreground transition-colors hover:text-foreground"
                onClick={urlCheck}
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
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Settings
              </a>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <a href="/log-in" className={buttonVariants({ variant: "outline" })}>
            Log in
          </a>

          <ModeToggle></ModeToggle>

          {!SettingOption ? (
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>hi</div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
