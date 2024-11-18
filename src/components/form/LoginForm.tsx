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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(5, "Username or email is required").max(50),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false); // State untuk notifikasi
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    setEmailNotVerified(false);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!res?.error) {
        form.reset();
        setLoading(false);
        push("/");
      } else {
        setLoading(false);
        if (res.error === "Email not verified") {
          setEmailNotVerified(true)
        } else if (res.status === 401) {
          setError("Invalid username or password");
        } else if (res.error === "User not found") {
          setError("User not found. Please check your email or username.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-textPrimary text-4xl md:text-5xl font-black">
            Sign in
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
            Welcome back to{" "}
            <span className="text-textPrimary font-medium italic">
              Socialfy
            </span>
          </p>
        </div>
        {error && <div className="text-red-600 font-bold mb-3">{error}</div>}
        {emailNotVerified && (
          <div className="text-orange-600 font-bold mb-3">
            Your email is not verified. Please check your inbox for the
            verification link.
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg">Email or Username</FormLabel>
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
                    className="absolute right-2 top-2.5"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <Eye className="text-gray-400" />
                    ) : (
                      <EyeClosed className="text-gray-400" />
                    )}
                  </div>
                </div>
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
            Login
          </Button>
        )}

        <div className="text-center">
          <Link
            href="/register"
            className="text-textPrimary hover:underline md:text-lg"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
