import qs from 'qs'
import { getStrapiURL } from './api-helpers'

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  // Merge default and user options
  const mergedOptions = {
    next    : { revalidate : 60 },
    headers : {
      'Content-Type' : 'application/json',
      Authorization  : `Bearer ${token}`,
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify( urlParamsObject )
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`

  // Trigger API call
  const response = await fetch( requestUrl, mergedOptions )

  return response
}
