'use client'
import LinkOpenNewTab from '@/components/Buttons/LinkOpenNewTab'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import LinkedinIcon from '@/components/Icons/LinkedinIcon'
import CopyToClipboard from '@/components/Inputs/CopyToClipboard'
import Shape from '@/components/Shape'
import { IApiProfile } from '@/types/api/profile'
import Image from 'next/image'
import { FunctionComponent, useRef } from 'react'
import { scalePow } from 'd3-scale'
import { cn } from '@/lib/utils'
import getImageSize from '@/lib/getImageSize'

interface Props {
  profile: IApiProfile
  myposy?: number
  winheight?: number
}

const Section1: FunctionComponent<Props> = ( props ) => {
  const { profile, myposy } = props

  const ref = useRef<HTMLElement>( null )

  const translate = scalePow().domain( [-2000, 2000] ).range( [-100, 100] )
  const opacity = scalePow()
    .domain( [
      0,
      ref.current?.offsetHeight ? ref.current?.offsetHeight - 40 : 1000,
    ] )
    .range( [1, 0] )

  return (
    <section
      ref={ref}
      id="home"
      className={cn( 'main__section !px-0 sm:px-0 md:px-0 bg-dark relative' )}
      style={{
        opacity : opacity.exponent( 1 )( myposy ? -myposy : 1 ),
      }}
    >
      <Shape myposy={myposy ? myposy : 0} />
      <div className="flex w-full h-56 relative bg-[url('/rock-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div
          className="aspect-square w-48 border border-none rounded-full overflow-hidden inset-x-0 mx-auto absolute -bottom-24"
          style={{
            transform : `translate(0, ${translate.exponent( 1 )(
              myposy ? -myposy : 0
            )}px)`,
          }}
        >
          <Image
            src={getImageSize( profile.personImage || '', 'lg' )}
            alt="Profile image"
            fill
            priority
            sizes="auto"
            className="object-cover"
          />
        </div>
      </div>
      <div
        className="w-full grow-[1] max-w-3xl relative overflow-hidden mt-32 mb-20 flex flex-col gap-4 sm:px-4 px-4 md:px-4 lg:px-0 xl:px-0 2xl:px-0"
        style={{
          transform : `translate(0, ${translate.exponent( 1 )(
            myposy ? -myposy : 0
          )}px)`,
        }}
      >
        <p className="text-center text-display-md-medium">{profile.name}</p>
        <p className="text-center text-md text-white/75">
          A frontend developer with pixel-perfect mindset, I am committed to
          creating software that is simple, robust, and easy to maintain at a
          fast pace. I have a proven track record of reducing complexity and
          improving the clarity of codebases. With an open mind and unbiased
          approach, I excel in brainstorming sessions, mentoring, and code
          reviews. I take pleasure in hands-on problem-solving.
        </p>
        <div className="text-lg flex gap-4 text-center w-full justify-center flex-wrap">
          <LinkOpenNewTab
            url={'https://www.instagram.com/ianfebi01/'}
            label={'Instagram'}
            className="text-md"
            icon={<InstagramIcon size={20} />}
          />
          •
          <LinkOpenNewTab
            url={'https://www.linkedin.com/in/ian-febi-sastrataruna-895598149/'}
            label={'LinkedIn'}
            className="text-md"
            icon={<LinkedinIcon size={20} />}
          />
          •
          {/* <LinkOpenNewTab
            url={'mailto:ianfebi01@gmail.com'}
            label={'Email'}
            className="text-md"
            icon={<EnvelopSimpleIcon size={20} />}
          /> */}
          <div className=" flex flex-row items-center gap-2">
            <CopyToClipboard
              copyText="ianfebi01@gmail.com"
              className="text-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section1
