import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_auth", process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure:   true,
    maxAge:   60 * 60 * 24, // 24 hours
    path:     "/",
  });

  return response;
}