import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'id']
const defaultLocale = 'en-US';

export function getLocale( request: NextRequest ) {
  // Get 'accept-language' from the request headers
  const acceptLanguage = request.headers.get( 'accept-language' ) || defaultLocale;

  // Use Negotiator to parse languages
  const languages = new Negotiator( { headers : { 'accept-language' : acceptLanguage } } ).languages();

  // Match the best locale
  return match( languages, locales, defaultLocale );
}

export function middleware( request: NextRequest ) {
  const { pathname } = request.nextUrl;
  
  // Skip Next.js internals and static files
  if ( pathname.startsWith( '/_next' ) || pathname.startsWith( '/public' ) || pathname.includes( '.' ) ) {
    return;
  }
  
  // Check if pathname already includes a locale
  const pathnameHasLocale = locales.some(
    ( locale ) => pathname.startsWith( `/${locale}/` ) || pathname === `/${locale}`
  );
  
  if ( pathnameHasLocale ) return;
  
  // Redirect to the preferred locale
  const locale = getLocale( request );
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect( request.nextUrl );
}

export const config = {
  matcher : [
    // Skip all internal paths (_next)
    '/((?!_next|public).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
