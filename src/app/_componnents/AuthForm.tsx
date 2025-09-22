"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../_schemas/loginSchema";
import { registerSchema } from "../_schemas/RegisterSchema";
import z from "zod";
import ErrorMessage from "./puplicComponents/ErrorMesage";

export default function AuthForm({ type }: { type: string }) {
  const schema = type === "login" ? loginSchema : registerSchema;
  const formTitle=type==="login"?"Login Now":"Register Now"
  const _defaultValue =
    type === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", rePassword: "", phone: "" };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: _defaultValue,
  });
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if(type==="login"){
 const result = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
    
  });
    if (result?.error) {
    return <ErrorMessage message={result.error}/>
  } else {
    window.location.pathname = "/";
  }
    }
  }
  return (
    <div className="container p-5 rounded max-w-[80%] md:my-9 m-5 bg-gray-100">

    <h1 className="pb-5">{formTitle}</h1>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        {/* name input */}
        {type === "register" && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* email input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail:</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* password input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {type === "register" && (
          <>
            {/* repassword input */}
            <FormField
              control={form.control}
              name="rePassword"
              type="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repassword:</FormLabel>
                  <FormControl>
                    <Input {...field} name="rePassword" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* phone input */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
<div className="flex justify-end">
        <Button className="btn" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  );
}
