'use client'

// import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
// import { IApi } from '@/types/api'
// import { IApiProfile } from '@/types/api/profile'
// import { useQuery } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { useSession } from 'next-auth/react'
// import Spinner from '../Icons/Spinner'
import { ReactNode } from 'react'

export default function ProfileProvider( {
  children,

}: {
  children: ReactNode
} ) {
  // const { data: session, update } = useSession()

  // const axiosAuth = useAxiosAuth()

  // const { isLoading } = useQuery<AxiosResponse<IApi<IApiProfile>>>( {
  // 	queryKey : ['profile'],
  // 	queryFn  : async()=> {
  // 		const data = await axiosAuth.get(
  // 			`/v1/profile`
  // 		)

  // 		await update( {
  // 			...session,
  // 			user : {
  // 				...session?.user,
  // 				...data?.data.data
  // 			}
  // 		} )
			
  // 		return data
  // 	}
  // } )

  // return isLoading ? 
  // 	<div className='w-full grow-[1] h-full flex justify-center items-center'>

  // 		<Spinner classes='!w-10 !h-10'/>

  // 	</div> 
  // 	: <>{ children }</>
	
  return  <>{ children }</>
}
