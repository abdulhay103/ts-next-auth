"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function Logout() {
  return (
    <span
      className="cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </span>
  );
}
