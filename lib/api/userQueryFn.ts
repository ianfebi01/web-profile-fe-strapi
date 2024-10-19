import api from "../api";

export const getUserQueryFn = async () =>
  api.get( `/v1/user` ).then( ( res ) => res.data )
	
export const getProfileQueryFn = async () =>
  api.get( `/v1/profile` ).then( ( res ) => res.data )
