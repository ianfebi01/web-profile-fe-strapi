// src/app/sign-out/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'
import ButtonSignOut from '@/components/Buttons/ButtonSignOut'

const SignOutPage = async () => {
  const session = await getServerSession( authOptions )

  if ( !session ) {
    redirect( '/' )
  } else {
    return (
      <div>
        <h1>SignOutPage</h1>

        <ButtonSignOut />
      </div>
    )
  }
}

export default SignOutPage
