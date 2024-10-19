"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import api from "../api";
import { Session } from "next-auth";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const updateSession = async( value: Session )=>{
    await update( value )
  }

  const refreshToken = async () => {

    api.interceptors.response.use(
      ( response )=> response,
      async( error )=>{
				
        if ( error?.response?.status === 401 &&  error.response.config.url === '/v1/auth/refresh' ){
          return signOut()
        }
				
        return Promise.reject( error );
      }

    )
    const res = await api.get( "/v1/auth/refresh", {
      headers : {
        Authorization : 'Bearer ' + session?.user?.refreshToken
      }
    } );
    
    if ( session ) await  updateSession( { 
      ...session, 
      user : {
        ...session.user,
        accessToken : res.data.data.accessToken
      } 
    } )
    else signIn();
  };
	
  return refreshToken;
};