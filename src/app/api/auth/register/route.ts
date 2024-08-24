import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hasedPassword = await hash(password, 10);
    const response = await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hasedPassword})
    `;
    return NextResponse.json({
      data: response,
      status: "Successfully create user.",
    });
  } catch (e) {
    return NextResponse.json({
      data: e,
      status: "Fail! Server Error.",
    });
  }
}
