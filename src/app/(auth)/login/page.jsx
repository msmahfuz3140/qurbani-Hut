"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoArrowForward,
} from "react-icons/io5";

import { authClient } from "@/lib/auth-client";
import { Form, Input, TextField, FieldError, toast } from "@heroui/react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: redirectTo,
    });

    if (error) {
      toast.danger(error.message || "Login failed");
    }
  };

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">

      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 md:p-8">

        {/* TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-stone-900">
            Login
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Welcome back to QurbaniHut
          </p>
        </div>

        {/* FORM */}
        <Form onSubmit={onSubmit} className="space-y-4">

          {/* EMAIL */}
          <TextField isRequired name="email">
            <label className="text-sm text-stone-700">Email</label>

            <div className="relative mt-1">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <Input
                name="email"
                placeholder="email@example.com"
                className="pl-10 w-full py-3 border rounded-lg bg-stone-50"
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* PASSWORD */}
          <TextField isRequired name="password">
            <label className="text-sm text-stone-700">Password</label>

            <div className="relative mt-1">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                className="pl-10 w-full py-3 border rounded-lg bg-stone-50"
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            Login <IoArrowForward />
          </button>
        </Form>

        {/* GOOGLE */}
        <button
          onClick={signIn}
          className="w-full mt-4 border py-3 rounded-lg text-sm hover:bg-stone-100 transition"
        >
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-stone-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;