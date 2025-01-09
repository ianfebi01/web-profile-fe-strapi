import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
// import { Outfit } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ReactQueryProvider from '@/components/Context/ReactQueryProvider'
import { Toaster } from 'react-hot-toast'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import NextTopLoader from 'nextjs-toploader'
import NavbarV2 from '@/components/Layouts/NavbarV2'
import SectionProvider from '@/components/Context/SectionProvider'
import Footer from '@/components/Pages/Home/Footer'
import { getSiteData } from '@/utils/get-site-data'
import { ApiSiteSite } from '@/types/generated/contentTypes'
// const outfit = Outfit( { subsets : ['latin'] } )

config.autoAddCss = false

export const metadata: Metadata = {
  title : 'Ian Febi S',
  description :
    'Front End Web Developer with 1+ year of experience. Expert on React js and Vue js',
}

export default async function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  const siteData = ( await getSiteData( 'en' ) ) as { data: ApiSiteSite }

  return (
    <html lang="en">
      <GoogleAnalytics />
      <ReactQueryProvider>
        <body suppressHydrationWarning={true}>
          <NextTopLoader
            color="#F26B50"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #F26B50,0 0 5px #F26B50"
          />
          <Toaster
            toastOptions={{
              // icon : (
              // 	<div className="text-20" data-cy="modal-information-icon">
              // 		<ModalInformationIcon />
              // 	</div>
              // ),
              position  : 'top-right',
              className : 'bg-white text-dark text-md',
              style     : {
                boxShadow : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                height    : '44px',
              },
            }}
          />
          <div className="min-h-screen flex flex-col">
            <NavbarV2
              items={siteData?.data?.attributes?.mainNavMenu}
              socials={siteData?.data?.attributes?.socials}
            />
            {children}
            <SectionProvider>
              <Footer />
            </SectionProvider>
          </div>
        </body>
      </ReactQueryProvider>
    </html>
  )
}
