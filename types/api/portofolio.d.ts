import { IApiSkill } from "./skill"

export interface IApiPortofolio {
  id: number
  name: string
  description: string
  image: string
  year: Date
  userId: number
  skills?: IApiSkill[]
}
