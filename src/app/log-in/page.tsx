"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/ui/icons";

export default function LoginForm() {
  const { toast } = useToast();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading ,setIsLoading] = useState(false)
  
  async function submit() {
    setIsLoading(true)
    try {
      const res = await axios.get("/api/auth/get", {
        params: {
          email: email,
          password: password,
        },
      });
      if (res.data?.msg === "user not found") {
        setIsLoading(false)
        toast({
          title: "user not found !!!",
        });
        console.log(res.data.msg)
      } else {
        toast({
          title: "logged in successfully",
        });
        window.location.href = "/";
      }
      setIsLoading(false)
    } catch (err) {
      toast({
        title: "incorrect password",
      });
      setIsLoading(false)
    }
  
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-2/6 max-sm:w-3/4 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Enter your Pmail and Password below to log In
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={submit} className="w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
