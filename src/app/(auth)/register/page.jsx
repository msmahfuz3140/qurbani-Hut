"use client";
import React, { useState } from "react";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLinkOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  TextField,
  toast,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photo = formData.get("photo");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });

    if (error) {
      toast.danger(error.message, {
        actionProps: {
          children: "Remove",
          variant: "danger",
        },
        description:
          "Something went wrong during registration. Please try again.",
        indicator: <IoAlertCircleOutline size={20} />,
      });
    }
    const logOut = async () => {
      await authClient.signOut();
      router.push("/login");
    };
    if (!error) {
      toast.success("Registration successful! Please login your account now.");
      logOut();
    }

    console.log(data, error, "--- Sign Up Response ---");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-0.5 w-8 bg-blue-500/30"></span>
            <span className="text-blue-500 text-xs font-black uppercase tracking-[0.4em]">
              QurbaniHut Marketplace
            </span>
            <span className="h-0.5 w-8 bg-blue-500/30"></span>
          </div>
          <h1 className="text-5xl font-serif text-stone-900 tracking-tighter mb-2">
            Create Account
          </h1>
          <p className="text-stone-900/50 font-medium">
            Join our community for a premium experience
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-xl border border-stone-200 shadow-xl shadow-stone-200/50">
          <Form className="space-y-5" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(v) =>
                v.trim().length < 3
                  ? "Please enter a valid full name (at least 3 characters)"
                  : null
              }
              className="space-y-2"
            >
              <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <IoPersonOutline className="absolute left-4 text-stone-400 size-5 z-10" />
                <Input
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
            </TextField>

            <TextField
              isRequired
              name="photo"
              validate={(v) =>
                !v.startsWith("https://")
                  ? "Please enter a valid url (must start with https://)"
                  : null
              }
              className="space-y-2"
            >
              <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                Avatar URL
              </label>
              <div className="relative flex items-center">
                <IoLinkOutline className="absolute left-4 text-stone-400 size-5 z-10" />
                <Input
                  name="photo"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
            </TextField>

            <TextField
              isRequired
              name="email"
              validate={(v) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
                  ? "Please enter a valid email address"
                  : null
              }
              className="space-y-2"
            >
              <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <IoMailOutline className="absolute left-4 text-stone-400 size-5 z-10" />
                <Input
                  name="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
            </TextField>

            <TextField
              isRequired
              name="password"
              validate={(v) =>
                v.length < 8
                  ? "Please enter a stronger password (at least 8 characters)"
                  : null
              }
              className="space-y-2"
            >
              <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                Password
              </label>
              <InputGroup className="w-full h-14.5 bg-stone-50 border border-stone-200 rounded-xl focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all overflow-hidden flex items-center">
                <div className="pl-4 text-stone-400">
                  <IoLockClosedOutline size={20} />
                </div>
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="enter a strong password"
                  className="flex-1 px-3 bg-transparent border-none focus:ring-0 text-stone-900"
                />
                <InputGroup.Suffix className="pr-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setIsVisible(!isVisible)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    {isVisible ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
            </TextField>

            <button
              type="submit"
              className="w-full py-5 bg-stone-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-500 transition-all active:scale-[0.98] shadow-xl"
            >
              Join the Store
            </button>
          </Form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
              <span className="bg-white px-4 text-stone-300">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="w-full py-4 bg-white text-stone-700 border border-stone-200 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-stone-50 hover:border-stone-300 transition-all active:scale-[0.98] shadow-sm mt-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue With Google
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-stone-900/40 text-xs font-bold uppercase tracking-[0.2em]"
          >
            ← Back To Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
