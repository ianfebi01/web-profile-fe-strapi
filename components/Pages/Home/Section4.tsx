'use client'
import Button from '@/components/Buttons/Button'
import TextHeader from '@/components/Texts/TextHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import sanitizeHtml from 'sanitize-html';

const experience = [
  {
    companyName : 'PrivyID',
    startDate   : new Date( '2022-10-10' ),
    endDate     : new Date( '2023-01-10' ),
    role        : 'Front End Developer Intern',
    desc        : '<ul><li>Intergrate Oauth 2 to Nuxt js 2.</li><li><p>Create landing page using Nuxt 3 and Typescript.</p></li><li><p>Intergrate Privy sign feature for external app.</p></li><li><p>Intergrate payment gateway.</p></li><li><p>Learn Storybook, Nuxt Js 3, Firebase, Unit Testing, andDesign System on acceleration program for engineer.</p></li><li><p>Create HR app to handle employee mobility and mutation.Build using Nuxt Js 3, Typescrypt, and Pinia.</p></li></ul>',
  },
  {
    companyName : 'PrivyID',
    startDate   : new Date( '2022-10-10' ),
    endDate     : new Date( '2023-01-10' ),
    role        : 'Front End Developer Intern',
    desc        : '<ul><li><p>Intergrate Oauth 2 to Nuxt js 2.</p></li><li><p>Create landing page using Nuxt 3 and Typescript.</p></li><li><p>Intergrate Privy sign feature for external app.</p></li><li><p>Intergrate payment gateway.</p></li><li><p>Learn Storybook, Nuxt Js 3, Firebase, Unit Testing, andDesign System on acceleration program for engineer.</p></li><li><p>Create HR app to handle employee mobility and mutation.Build using Nuxt Js 3, Typescrypt, and Pinia.</p></li></ul>',
  },
]

const Section4: FunctionComponent = () => {
  const [show, setShow] = useState<number[]>( [] )

  const handleShow = ( i: number ) => {
    if ( show?.includes( i ) ) {
      setShow( show.filter( ( item ) => item !== i ) )
    } else setShow( [...show, i] )
  }
	
  return (
    <section id="experience"
      className="main__section h-fit bg-dark-secondary"
    >
      <div className="main__container my-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="">
            <TextHeader
              title="Experience"
              subtitle="See what i’ve been working on"
            />
          </div>
          <div className="bg-dark w-full h-fit border border-none rounded-lg p-4 flex flex-col">
            {experience?.map( ( item, i ) => (
              <div
                className={`flex flex-col px-4 gap-2 text-white-overlay  border  border-t-0 border-r-0 border-l-0 ${
                  experience?.length - 1 === i
                    ? 'border-b-0 pb-0 mb-0'
                    : 'border-b-dark-secondary pb-4 mb-4'
                }`}
                key={i}
              >
                <div className="grid sm:grid-cols-10 gap-1 font-bold text-white">
                  <h2 className="col-span-8 sm:col-span-3 m-0 text-xl font-bold">
                    {item.companyName}
                  </h2>
                  <time className="col-span-8 sm:col-span-3 text-white-overlay ">
                    {format( item.startDate, 'MMM yyyy' ) +
                      ' - ' +
                      format( item.endDate, 'MMM yyyy' )}
                  </time>
                  <h3 className="col-span-7 sm:col-span-3 text-white-overlay text-sm">
                    {item.role}
                  </h3>
                  <div className="col-span-1 text-right">
                    <Button
                      variant="link"
                      onClick={() => handleShow( i )}
                      className="text-white-overlay"
                    >
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-default ${
                          show.includes( i ) ? '-rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </div>
                </div>
                {show.includes( i ) && (
                  <div
                    className="leading-5"
                    dangerouslySetInnerHTML={{ __html : sanitizeHtml( item.desc ) }}
                  ></div>
                )}
              </div>
            ) )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section4
