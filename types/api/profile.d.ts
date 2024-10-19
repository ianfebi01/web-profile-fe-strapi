export interface IApiProfile{
        id?: number
        email?: string
        name?: string
        avatar?: string
        quote?: string | null
        positionId?: string | null
        personImage?: string
        openToWork?: boolean
        textBg?: string
        accessToken?: string
        refreshToken?: string
}
export interface IApiPayload{
        email: string
        name: string
        quote?: string | null
        personImage?: string
        textBg?: string,
        openToWork?: boolean
}