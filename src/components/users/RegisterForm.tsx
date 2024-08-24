"use client";
import { ErrorToast, SuccessToast } from "@/utils/formHealper";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Optional: Validation check before submitting
    if (!formData.get("email") || !formData.get("password")) {
      ErrorToast("Email and Password are required.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const json = await response.json();

    if (response.ok && json.status === "Successfully create user.") {
      SuccessToast(json.status);
      router.push("/login");
      router.refresh();
    } else {
      ErrorToast(json.status || "Registration failed.");
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
          Register
        </button>
      </form>
    </div>
  );
}
