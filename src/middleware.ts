import { getUser } from '@/usecase/user';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const user = await getUser();
  const isLoggedIn = !!user;

  switch (request.nextUrl.pathname) {
    case '/':
      const redirectPath = isLoggedIn ? '/dashboard' : '/sign-in';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    case '/sign-in':
      if (isLoggedIn)
        return NextResponse.redirect(new URL('/dashboard', request.url));
      break;
    case '/user-settings':
      if (!isLoggedIn)
        return NextResponse.redirect(new URL('/sign-in', request.url));
      break;
    default:
      if (!isLoggedIn)
        return NextResponse.redirect(new URL('/sign-in', request.url));
      if (!user.name)
        return NextResponse.redirect(new URL('/user-settings', request.url));
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
     * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest (metadata files)
     * - icons
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|icons).*)',
  ],
};
