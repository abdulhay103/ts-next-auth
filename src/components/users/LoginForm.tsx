"use client";
import { ErrorToast, SuccessToast } from "@/utils/formHealper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (!response?.ok) {
      ErrorToast("Invailid Email or Password");
    } else {
      SuccessToast("Login Success");
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className=" flex min-h-screen justify-center w-full items-center">
      <form
        action="POST"
        onSubmit={submitHandler}
        className=" flex flex-col gap-2 max-w-md mt-10"
      >
        <input
          type="email"
          className=" border border-red-800 rounded py-2 px-4 text-green-500 placeholder:text-gray-500"
          placeholder="Email"
          name="email"
          id="email"
        />
        <input
          type="password"
          className=" border  border-red-800 rounded py-2 px-4 text-green-500 placeholder:text-gray-500"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button
          type="submit"
          className=" px-5 py-2 bg-green-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
