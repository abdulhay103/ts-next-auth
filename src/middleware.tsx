import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Allow requests to /login or any API/auth routes
  if (pathname === "/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // If the user is not logged in, redirect to the login page with a callback URL
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url)
    );
  }

  // If the user is trying to access the dashboard and is not using the correct email, deny access
  if (pathname === "/dashboard" && token.email !== "info.aerodevs@gmail.com") {
    return NextResponse.redirect(new URL("/", req.url)); // Or redirect to an access denied page
  }

  // If the user is authenticated and has the correct email, allow access
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard"] };
