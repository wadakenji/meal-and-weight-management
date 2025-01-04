import { getUser } from '@/usecase/user';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const user = await getUser();
  const isLoggedIn = !!user;

  switch (request.nextUrl.pathname) {
    case '/':
      const redirectPath = isLoggedIn ? '/register' : '/sign-in';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    case '/sign-in':
      if (isLoggedIn)
        return NextResponse.redirect(new URL('/register', request.url));
      break;
    default:
      if (!isLoggedIn)
        return NextResponse.redirect(new URL('/sign-in', request.url));
      break;
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)',
  ],
};
