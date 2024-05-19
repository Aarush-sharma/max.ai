"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setemail] = useState("");

  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit() {
    setIsLoading(true);
    router.push("/sign-up/otp");
    try {
      const res = await axios.get("/api/auth/otp", {
        params: {
          email: email,
        },
      });
      console.log(res.data);
      setIsLoading(false);
      toast({
        title: "otp sent succesfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className="border border-[hsl(240 3.7% 15.9%)] rounded-xl px-5 py-5 w-[66vh] my-4 mx-4">
          <div className="">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <div className="grid gap-6">
                <form className="space-y-8">
                  <Input
                    type="text"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="name@example.com"
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign Up with Email
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading}>
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                  )}{" "}
                  Google
                </Button>
              </div>
              <div className="flex justify-center ">
                <p className=" pt-1">Already have a account?</p>
                <a href="/log-in" className="mt-1 ml-1 focus:text-gray-200 hover:decoration-muted">
                  login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
