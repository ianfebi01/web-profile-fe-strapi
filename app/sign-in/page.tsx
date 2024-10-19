// src/app/sign-out/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'
import ButtonSignIn from '@/components/Buttons/ButtonSignIn'

const SignOutPage = async () => {
  const session = await getServerSession( authOptions )

  if ( session ) {
    redirect( '/admin' )
  } else {
    return (
      <main className="main">
        <div className="h-full grow-[1] flex flex-col items-center justify-center max-w-xs w-full">
          <div className="flex flex-col items-center gap-6 justify-center bg-dark-secondary p-6 border border-none rounded-lg w-full">
            <div className=" flex items-center flex-col">
              <h1 className="text-xl xl:text-2xl">Sign In</h1>
              <p>Sign in to access content management</p>
            </div>

            <ButtonSignIn />
          </div>
        </div>
      </main>
    )
  }
}

export default SignOutPage
