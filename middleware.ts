import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that require authentication
  const protectedPaths = ["/account", "/orders", "/checkout"]

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

  // Get the token from cookies
  const token = request.cookies.get("token")?.value

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !token) {
    // Create the URL to redirect to
    const url = new URL("/auth", request.url)
    url.searchParams.set("callbackUrl", path)

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes
    // - Static files
    // - Public files
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}

