"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required")
      .min(8, "Password must be at least 8 characters"),
    username: z.string().min(5, "Username is required").max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    // Simulate a delay (e.g., saving data)
    setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms delay

    console.log(values);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-textPrimary text-4xl font-black md:text-5xl">
            Sign up
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
            Create your account to start{" "}
            <span className="text-textPrimary font-medium italic">
              Socialfy
            </span>
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  className="py-6 md:text-lg"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password..."
                    className="py-6 md:text-lg"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-2 top-2.5 "
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <Eye className="text-gray-400 cursor-pointer" />
                    ) : (
                      <EyeClosed className="text-gray-400 cursor-pointer" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Confirm Password..."
                    className="py-6 md:text-lg"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-2 top-2.5"
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <Eye className="text-gray-400 cursor-pointer" />
                    ) : (
                      <EyeClosed className="text-gray-400 cursor-pointer" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Create your username..."
                  className="py-6 md:text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button
            disabled
            className="w-full py-6 bg-textPrimary font-semibold md:text-lg"
          >
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full py-6 bg-textPrimary font-semibold hover:bg-textPrimary/90 md:text-lg"
          >
            Register
          </Button>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="text-textPrimary hover:underline md:text-lg"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
