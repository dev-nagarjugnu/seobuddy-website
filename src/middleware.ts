import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // If user is trying to access /dashboard
    if (pathname === "/dashboard") {
      // Check user role and redirect accordingly
      if (token?.role === "ADMIN") {
        // Admin stays on /dashboard
        return NextResponse.next()
      } else {
        // Regular users get redirected to user dashboard
        return NextResponse.redirect(new URL("/user-dashboard", req.url))
      }
    }

    // If user is trying to access /user-dashboard
    if (pathname === "/user-dashboard") {
      // Check user role and redirect accordingly
      if (token?.role === "ADMIN") {
        // Admin gets redirected to admin dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url))
      } else {
        // Regular users stay on /user-dashboard
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/user-dashboard/:path*"]
} 