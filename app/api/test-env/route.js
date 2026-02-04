import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    adminLoaded: !!process.env.ADMIN_PASSWORD
  });
}
