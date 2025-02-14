import PortofolioSearch from '@/components/Content/PortofolioSearch'
import Header from '@/components/Layouts/Header'

export async function generateMetadata() {
  const title = 'Portofolio | Ian Febi Sastrataruna'
  const desc = 'Portofolio of Ian Febi Sastrataruna'

  return {
    title       : title,
    description : desc,
    keywords    : 'Frontend developer portofolio',

    openGraph : {
      title       : title,
      description : desc,
      siteName    : 'Ian Febi Sastrataruna', // Replace with your site name
      type        : 'website', // or "article"
    },
    twitter : {
      card        : 'summary',
      site        : '@ianfebi01',
      title       : title,
      description : desc || '',
    },
  }
}

export default function PortofolioPage() {
  return (
    <main>
      <section id="portofolio"
        className="h-fit bg-dark"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 sm:mt-20 flex flex-col gap-4">
          <Header text="Portofolio"
            link={'/'}
          />
          <PortofolioSearch />
        </div>
      </section>
    </main>
  )
}
