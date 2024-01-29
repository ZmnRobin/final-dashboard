import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  const { pathname } = request.nextUrl;
  
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if ((pathname.startsWith("/admin") || pathname.startsWith("/manager") || pathname.startsWith("/seller")) &&
      (!token || !role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (token && (pathname.startsWith("/admin") && role?.value !== "admin" ||
                pathname.startsWith("/manager") && role?.value !== "manager" ||
                pathname.startsWith("/seller") && role?.value !== "seller")) {
      return NextResponse.redirect(new URL(`/${role?.value}`, request.url));
    }
    if (token && (pathname.startsWith("/login") || pathname === "/")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

  return NextResponse.next();
}
