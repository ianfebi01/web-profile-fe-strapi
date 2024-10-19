import { AxiosError, AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
import { IApi } from '@/types/api'
import {
  IUploadImageResponse,
  UploadApiResponse,
} from '@/types/api/upload-image'
import toast from 'react-hot-toast'

export const useUpload = () => {
  const axiosAuth = useAxiosAuth()
  const upload = async (
    base64: string
  ): Promise<IUploadImageResponse | undefined> => {
    try {
      const res: AxiosResponse<IApi<UploadApiResponse>> = await axiosAuth.post(
        `/v1/upload-image-base64`,
        {
          image : base64,
        }
      )

      if ( res.data.data && res.data.status === 200 ) {
        return { data : res.data.data.secure_url, status : res.data.status }
      }
    } catch ( error ) {
      const err = error as AxiosError
      toast.error( 'Cant upload image, please try again latter.' )

      return { data : '', status : err.response?.status || null }
    }
  }

  return upload
}
