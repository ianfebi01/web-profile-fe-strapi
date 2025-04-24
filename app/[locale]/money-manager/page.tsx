import { cn } from "@/lib/utils"
import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

type Props = {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function PageMoneyManager( { params }: Props ) {

  const { locale } = await params

  const t = await getTranslations( { locale } )
  
  return (
    <main>
      <section id="money-manager"
        className="h-fit bg-dark"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 sm:mt-20 flex flex-col gap-4">
         tes
        </div>
      </section>
    </main>
  )
}
