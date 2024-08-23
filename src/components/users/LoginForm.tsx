"use client";
import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";

export default function LoginForm() {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
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
          id=""
        />
        <input
          type="password"
          className=" border  border-red-800 rounded py-2 px-4 text-green-500 placeholder:text-gray-500"
          placeholder="Password"
          name="password"
          id=""
        />
        <button
          type="submit"
          className=" px-5 py-2 bg-green-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
