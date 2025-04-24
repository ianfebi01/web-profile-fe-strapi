import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware( routing );

function authMiddleware( req: NextRequest ) {
  const isAuthenticated = Boolean( req.cookies.get( 'auth-token' )?.value ); // Adjust for your auth logic

  if ( !isAuthenticated ) {
    const loginUrl = new URL( '/money-manager/login', req.url );
    
    return NextResponse.redirect( loginUrl );
  }

  return NextResponse.next();
}

export default function middleware( req: NextRequest ) {
  const locale = routing.locales.find( locale =>
    req.nextUrl.pathname.startsWith( `/${locale}/` )
  );

  // Get the path without the locale
  const basePath = locale ? req.nextUrl.pathname.replace( `/${locale}`, '' ) : req.nextUrl.pathname;

  // Run i18n middleware first
  const intlResponse = intlMiddleware( req );

  // Apply auth ONLY to /money-manager/** EXCEPT /money-manager/login
  if (
    basePath.startsWith( '/money-manager' ) &&
    !basePath.startsWith( '/money-manager/login' ) &&
    !basePath.startsWith( '/money-manager/register' )
  ) {
    const authResponse = authMiddleware( req );
    if ( authResponse.status !== 200 ) {
      return authResponse;
    }
  }

  return intlResponse;
}

export const config = {
  matcher : '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
