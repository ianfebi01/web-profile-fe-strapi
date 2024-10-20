import SectionProvider from '@/components/Context/SectionProvider'
import NavbarV2 from '@/components/Layouts/NavbarV2'
import Footer from '@/components/Pages/Home/Footer'
import React from 'react'

export default function LandingLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavbarV2 />
        {children}
        <SectionProvider>
          <Footer />
        </SectionProvider>
      </div>
    </>
  )
}
