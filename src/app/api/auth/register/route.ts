import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hasedPassword = await hash(password, 10);
    console.log({ email, hasedPassword });

    const response = await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hasedPassword})
    `;
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({
    data: "data",
    status: "Success",
  });
}
