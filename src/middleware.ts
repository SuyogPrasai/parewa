import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
import { getToken } from 'next-auth/jwt';
import { decrypt } from './lib/session';
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const emailParam = pathname.split("/").pop(); // Extract email from the dynamic route

  const token = await getToken({ req: request });



  // If session does not exist, redirect to email verification
  if (["/set_password", "/verify_otp"].some(path => pathname.startsWith(path))) {
    // Retrieve session cookie
    const cookieStore = await cookies();
    console.log("cookie store", cookieStore)
    const _cookie = cookieStore.get("signup-session")?.value; // Assuming "session" is the cookie name
    const session = _cookie ? await decrypt(_cookie) : null;

    console.log("Middleware Debug:");
    console.log("Token:", token);
    console.log("Session:", session);
    if (!session) {
      console.log("session dont exist")
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    const { email, verify_email, verify_otp } = session;

    // Ensure email matches the session
    if (!email || email !== emailParam) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect users who haven't verified email
    if (pathname.startsWith("/verify_otp/") && !verify_email) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    // Redirect users who haven't verified OTP
    if (pathname.startsWith("/set_password/") && (!verify_email || !verify_otp)) {
      return NextResponse.redirect(new URL(`/verify_otp/${email}`, request.url));
    }

    return NextResponse.next();
  }


  // Redirect authenticated users away from auth pages
  if (token && ["/signin", "/signup", "/verify_email", "/verify_otp"].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!token && ["/account", "/dashboard"].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Define paths that should trigger the middleware
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/verify_email",
    "/verify_otp/:email*",
    "/set_password/:email*",
    "/account",
    "/dashboard",
  ],
};
