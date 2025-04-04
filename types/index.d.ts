import { Locale } from "next-intl"

export type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}
