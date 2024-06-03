"use client";

import React from "react";
import Box from "./ui/box";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import Link from "next/link";

export default function Main() {

  return (
    <div className="App w-full h-full  flex justify-start">
      <div className="mt-10 ml-7 flex">
        <div>
       
        <div className="mt-10 text-5xl flex flex-col justify-between gap-[5vh]">
          <div className="flex gap-4">
            <p className="font-barlow font-bold bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
              Max.AI
            </p>
            <p className="font-semibold">is</p>
            <p className="font-semibold">a</p>
            <p className="font-semibold">cutting-edge</p>
            <p className="font-semibold">web-based</p>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold">AI</p>
            <p className="font-semibold">playground.</p>
            <p className="font-semibold">built with</p>
            <p className="font-barlow font-bold bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
              Gemini
            </p>
            <p className="font-semibold">API</p>
          </div>
          <div className="flex gap-4">
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
            <Button><Link href={"/sign-up"}>create account</Link></Button>
            <Button variant={"ghost"}><Link href={"/sign-up"} className=" flex gap-2">Try now <Icons.link/></Link></Button>
          </div>
        </div>
        </div>

      </div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
    </div>
  );
}
