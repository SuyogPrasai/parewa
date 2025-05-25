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

  // TODOs refactor the todos and code this shit

  // If session does not exist, redirect to email verification
  if (["/set_password", "/verify_otp"].some(path => pathname.startsWith(path))) {
    // Retrieve session cookie
    const cookieStore = await cookies();
    const _cookie = cookieStore.get("signup-session")?.value; // Assuming "session" is the cookie name
    const session = _cookie ? await decrypt(_cookie) : null;

    if (!session) {
      console.log("session dont exist")
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    const { email, verify_email, verify_otp } = session;
    console.log(email, verify_email, verify_otp)

    // Ensure email matches the session
    if (!email || email !== emailParam) {
      return NextResponse.redirect(new URL("/home", request.url));
    } // TODO: what is this and why are we doing it?

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

  if (pathname == "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect authenticated users away from auth pages
  // TODO Redirect logged in users to the home page
  if (token && ["/", "/signin", "/signup", "/verify_email", "/verify_otp"].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!token && ["/home"].some(path => pathname.startsWith(path))) {
    
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Define paths that should trigger the middleware
export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/verify_email",
    "/verify_otp/:email*",
    "/set_password/:email*",
    "/account",
  ],
};
