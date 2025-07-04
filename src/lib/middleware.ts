import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  const [, payload] = token.split('.');
  const decoded = JSON.parse(atob(payload));
  const isExpired = decoded.exp * 1000 < Date.now();
  if (isExpired) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/todos'],
};