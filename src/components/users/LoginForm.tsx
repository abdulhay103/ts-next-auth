"use client";
import { ErrorToast, SuccessToast } from "@/utils/formHealper";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: callbackUrl,
    });

    console.log(response);

    if (!response?.ok) {
      ErrorToast("Invalid Email or Password");
    } else {
      SuccessToast("Login Success");
      router.push(response?.url || callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen justify-center w-full items-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 max-w-md mt-10"
      >
        <input
          type="email"
          className="border border-red-800 rounded py-2 px-4 text-green-500 placeholder:text-gray-500"
          placeholder="Email"
          name="email"
          id="email"
          required
        />
        <input
          type="password"
          className="border border-red-800 rounded py-2 px-4 text-green-500 placeholder:text-gray-500"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
