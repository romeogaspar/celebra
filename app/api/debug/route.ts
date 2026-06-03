import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasDbUrl:      !!process.env.DATABASE_URL,
    hasResendKey:  !!process.env.RESEND_API_KEY,
    hasCloudName:  !!process.env.CLOUDINARY_CLOUD_NAME,
    dbUrlStart:    process.env.DATABASE_URL?.substring(0, 20),
  });
}