import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/admin/dashboard");
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login";

  // Protect every dashboard route — no need to check auth manually
  // in each page.tsx anymore, middleware handles it centrally.
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // If already logged in, skip the login page and go straight in.
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
});

// Only run this middleware on admin routes — avoids unnecessary
// overhead on every public page request.
export const config = {
  matcher: ["/admin/:path*"],
};