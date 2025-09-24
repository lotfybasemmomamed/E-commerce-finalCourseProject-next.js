
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
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
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function AuthForm({ type }: { type: string }) {
  const baseUrl="https://ecommerce.routemisr.com/api/v1"
  const [isLoading, setIsLoading] = useState(false);

  const schema = type === "login" ? loginSchema : registerSchema;
  const formTitle = type === "login" ? "Login Now" : "Register Now";
  const _defaultValue =
    type === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", rePassword: "", phone: "" };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: _defaultValue,
  });

  // register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const res = await axios.post(`${baseUrl}/auth/signup`, data);
      return res.data;
    },
    onSuccess: async (data, variables) => {
      await signIn("credentials", {
        redirect: false,
        email: variables.email,
        password: variables.password,
      });
      window.location.pathname = "/";
    },
  });
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    if (type === "login") {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // console.log(result)
      if (result?.error) {
        setIsLoading(false);
        return <ErrorMessage message={result.error} />;
      } else if (result?.ok) {
        window.location.pathname = "/";
      }
    }
     if (type === "register") {
    registerMutation.mutate(data as z.infer<typeof registerSchema>, {
      onSettled: () => setIsLoading(false), 
    });
  }

  }
  return (
    <>
    {registerMutation.isError&&<ErrorMessage message={registerMutation.error.message}/>}
   
    <div className="container  p-5 rounded max-w-[80%] mt-24 md:mb-9 m-5 bg-gray-100">
      <h1 className="pb-5">{formTitle}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {/* name input */}
          {type === "register" && (
            <>
              <FormField
                // control={form.control }
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
                // control={form.control}
                name="rePassword"
                // type="password"
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
                // control={form.control}
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
          <div className="flex justify-end flex-col items-end">
            <Button className="btn w-full" type="submit">
              {isLoading?<i className="fa-solid fa-spin fa-spinner "></i>:"Submit"}
              
            </Button>
            {type === "login" && (
              <p className="mt-2 text-sm text-gray-600">
                 you have an account?
                <Link
                  href="/register"
                  className="text-main font-medium hover:underline"
                >
                  Register Now
                </Link>
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
     </>
  );
}



