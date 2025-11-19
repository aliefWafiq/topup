import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}