import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "@/components/others/Logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Auth",
  description: "Using and deploying next-auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          {!!session && <Logout />}
          {!session && <Link href="/login">Login</Link>}
        </nav>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
