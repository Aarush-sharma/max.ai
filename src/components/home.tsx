"use client";

import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import Link from "next/link";
import "./ui/styles/scroll.css";
import { ArrowRight, Brain, Shield, Zap} from 'lucide-react'
export default function Main() {
  return (
    <div className="min-h-screen">
    <div className="bg-background mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="block text-gray-900 dark:text-white">Welcome to</span>
          <span className="block mt-2 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Max.AI
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
          A cutting-edge web-based AI playground built with
          <span className="font-semibold text-blue-600 dark:text-blue-400"> Gemini API</span>,
          powered by <span className="font-semibold text-gray-800 dark:text-gray-200">Next.js</span> and
          <span className="font-semibold text-teal-600 dark:text-teal-400"> PostgreSQL</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/sign-up">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/ask" className="flex items-center gap-2">
              Try Now <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="pt-6">
              <div className="flow-root rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
                    {feature.name}
                  </h3>
                  <p className="mt-5 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

const features = [
  {
    name: 'Advanced AI Interactions',
    description: 'Engage with cutting-edge AI models for natural language processing and generation.',
    icon: Brain,
  },
  {
    name: 'Real-time Responses',
    description: 'Experience lightning-fast AI-powered responses to your queries and prompts.',
    icon: Zap,
  },
  {
    name: 'Secure & Scalable',
    description: 'Built on a robust Next.js and PostgreSQL stack for security and scalability.',
    icon: Shield,
  },
]