"use server";

import { logout } from "@/lib/api/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await logout();

  const redirect = request.nextUrl.searchParams.get("redirect");
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}
