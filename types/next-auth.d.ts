// eslint-disable-next-line
import NextAuth from "next-auth"
// eslint-disable-next-line
import { IApiProfile } from "./api/profile"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {

      /** Access Token. */
    user: IApiProfile & {
      oauthAccessToken: string
    }

  }
  interface Account {
      /** Access Token. */
      apiData:  IApiProfile & {
        oauthAccessToken?: string
      }
  }
}