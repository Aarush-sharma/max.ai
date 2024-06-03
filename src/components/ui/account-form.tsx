"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { useCookies } from "next-client-cookies";
import { toast } from "@/components/ui/use-toast";
import { DecodedToken } from "../chat";
import axios from "axios";
import { Input } from "@/components/ui/input";
import * as jwt from "jsonwebtoken";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.

export function AccountForm() {
  const cookies = useCookies();
  const tokenCookie = cookies.get("token") as string;
  const token = jwt.decode(tokenCookie) as DecodedToken;
  const DialogClose = DialogPrimitive.Close;
  const router = useRouter();
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues: Partial<AccountFormValues> = {
    name: token.username || "",
    email: token.email || "",
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const handlePasswordChange = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put("/api/auth/put", {
        passwordupdate: password,
      });
      toast({
        title: res.data.msg,
      });
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "something went wrong",
      });
    }
    setIsLoading(false);
  };
  const handleLogOut = () => {
    cookies.remove("token");
    window.location.href = "/";
    toast({
      title: "logged out successfully",
    });
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete("/api/auth/delete");
        window.location.href = "/";
        cookies.remove("token");
      
    } catch (err) {
      toast({
        title: "something went wrong",
      });
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-center items-center">
                  <label htmlFor="input">Name:</label>
                  <Input
                    className="border-none "
                    disabled={true}
                    placeholder="Your name"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex relative -top-5  justify-center items-center">
                <label htmlFor="input">Email:</label>
                <Input
                  className="border-none "
                  disabled={true}
                  {...field}
                ></Input>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>
                ) : (
                  "Change password"
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set new password</DialogTitle>
                <DialogDescription>
                  this will be your new password for future logins
                </DialogDescription>
              </DialogHeader>
              <div className="grid w-full gap-4">
                <div className="grid w-full items-center gap-4">
                  <Input
                    placeholder="example@123"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogClose>
                <Dialog>
                  <DialogTrigger>
                    <Button onClick={handlePasswordChange} className="gap-2">
                      Submit
                      <Icons.submit></Icons.submit>
                    </Button>
                  </DialogTrigger>
                  {isLoading && (
                    <DialogContent>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>
                    </DialogContent>
                  )}
                </Dialog>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Button onClick={handleLogOut}>Log out</Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                className=" text-red-800 hover:text-red-800"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>
                ) : (
                  "Delete account"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="text-red-800"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
}
