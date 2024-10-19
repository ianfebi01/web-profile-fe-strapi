
// import { getServerSession } from 'next-auth'
// import { NextRequest, NextResponse } from 'next/server'
// import { authOptions } from './app/lib/auth'
// import { signIn } from 'next-auth/react'

// // Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: '/admin/:path*',
// }

// export function middleware(request: NextRequest) {
//   // Call our authentication function to check the request
//   // const session = await getServerSession(authOptions)
//   signIn()

// console.log('tes')
//   // return NextResponse.redirect(new URL("/", request.url))
// }
export { default } from "next-auth/middleware";

// applies next-auth only to matching routes
export const config = { matcher : ["/admin"] };