"use client";
import { Input } from "@/components/ui/input";
import { Icons } from "./ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useToast } from "@/components/ui/use-toast";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { ToastAction } from "./ui/toast";
import Link from "next/link";


const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export function InputOTPForm() {
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setisverified] = useState(false);
  const cookies = useCookies();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function verify(data: z.infer<typeof FormSchema>) {
    
    const otp = cookies.get("otp") as string;
    if (otp === data.pin) {
      setisverified(true);
    } else {
      toast({
        title: "invalid otp"
      });
    }
  }
  async function onSubmit(){
    setIsLoading(true)
    const email = cookies.get("email") as string;
    try{
        const res = await axios.post("/api/auth/post",{
          username:username,
          email:email,
          password:password
      })
      console.log(res.data)
      setIsLoading(false)
      toast({
        title: "account created successfully",
        action: (
          <ToastAction altText="back to home"><a href="/">Go Back</a></ToastAction>
        ),
      })
      cookies.remove("email")
      cookies.remove("otp")
      } catch (err){
        console.log(err)
      }
  }
  
  return (
    <>
      {isVerified ? (
        <div className="">
          <Input
            type="text"
            
            onChange={(e) => setusername(e.target.value)}
            placeholder="john_doe"
          />
          <Input
            type="password"
            className="my-4"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="create password"
          />

          <Button type="submit" className="w-full" disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(verify)}
              className=" space-y-6 "
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
