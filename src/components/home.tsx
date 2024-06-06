"use client";

import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import Link from "next/link";
import "./ui/styles/scroll.css";

export default function Main() {
  return (
    <div className="flex justify-start max-[400px]:justify-center">
      <div className="mt-10 ml-7 flex max-[400px]:ml-2">
        <div>
          <div className="mt-10 text-5xl max-[900px]:text-2xl max-sm:text-lg max-[400px]:text-sm flex flex-col max-[400px]:gap-3 justify-between gap-[5vh]">
            <div className="flex gap-4 max-[400px]:gap-2">
              <p className="font-barlow font-bold bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Max.AI
              </p>
              <p className="font-semibold">is</p>
              <p className="font-semibold">a</p>
              <p className="font-semibold">cutting-edge</p>
              <p className="font-semibold">web</p>
              <p className="font-semibold">based</p>
            </div>
            <div className="flex gap-4 max-[400px]:gap-2">
              <p className="font-semibold">AI</p>
              <p className="font-semibold">playground.</p>
              <p className="font-semibold">built with</p>
              <p className="font-barlow font-bold bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Gemini
              </p>
              <p className="font-semibold">API</p>
            </div>
            <div className="flex gap-4 max-[400px]:gap-2">
              <p className="font-semibold">on</p>
              <p className="font-semibold">top</p>
              <p className="font-semibold">of</p>
              <p className="font-barlow font-bold bg-gradient-to-b from-gray-300 to-gray-700 text-transparent bg-clip-text">
                NEXT.js
              </p>
              <p className="font-semibold">and</p>
              <p className="font-barlow font-bold bg-gradient-to-b from-teal-400 to-blue-600 text-transparent bg-clip-text">
                PostgreSQL
              </p>
            </div>
            <div className="flex gap-5">
              <Button>
                <Link href={"/sign-up"}>create account</Link>
              </Button>
              <Button variant={"ghost"}>
                <Link href={"/ask"} className=" flex gap-2">
                  Try now <Icons.link />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
}
