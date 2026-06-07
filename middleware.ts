import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE = 'admin_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Allow the login page and its POST handler through
  if (pathname === '/admin/login') return NextResponse.next()

  const session = request.cookies.get(COOKIE)?.value
  if (session === 'authenticated') return NextResponse.next()

  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*'],
}
