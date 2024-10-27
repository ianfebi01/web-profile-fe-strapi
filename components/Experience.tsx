'use client'
import TextHeader from '@/components/Texts/TextHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { ApiExperienceExperience } from '@/types/generated/contentTypes'
import Markdown from './Parsers/Markdown'
import { Disclosure, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface Props {
  data: ApiExperienceExperience[]
}

const Experience: FunctionComponent<Props> = ({ data }) => {
  const [show, setShow] = useState<number[]>([])

  const handleShow = (i: number) => {
    if (show?.includes(i)) {
      setShow(show.filter((item) => item !== i))
    } else setShow([...show, i])
  }

  return (
    <section id="experience" className="main__section h-fit bg-dark-secondary">
      <div className="main__container my-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="">
            <TextHeader
              title="Experience"
              subtitle="See what i’ve been working on"
            />
          </div>
          <div className="w-full h-fit rounded-lg flex flex-col border overflow-auto border-white-overlay-2">
            {data?.map((item, i) => (
              <Disclosure as="div" key={i}>
                {({ open }) => (
                  <dl
                    className={cn(
                      'overflow-x-clip',
                      'border-t-[1px] border-white-overlay-2',
                      [i === 0 && 'border-t-[0px]']
                    )}
                    key={i}
                  >
                    <dt>
                      <Disclosure.Button className="grid sm:grid-cols-10 gap-1 font-bold bg-dark hover:bg-dark/90 py-4 px-4 text-white w-full relative z-[1] text-left">
                        <h2 className="col-span-8 sm:col-span-3 m-0 text-xl font-bold">
                          {item.attributes.companyName}
                        </h2>
                        <time className="col-span-8 sm:col-span-3 text-white-overlay text-base font-normal">
                          {format(
                            new Date(item.attributes.startDate),
                            'MMM yyyy'
                          ) +
                            ' - ' +
                            (!!item.attributes.endDate
                              ? format(
                                  new Date(item.attributes.endDate),
                                  'MMM yyyy'
                                )
                              : 'Present')}
                        </time>
                        <h3 className="col-span-7 sm:col-span-3 text-white-overlay text-base font-normal m-0">
                          {item.attributes.role}
                        </h3>
                        <div className="col-span-1 text-right">
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`transition-default ${
                              open ? '-rotate-180' : ''
                            }`}
                          />
                        </div>
                      </Disclosure.Button>
                    </dt>

                    <dd className="bg-dark overflow-hidden">
                      <Transition
                        enter="duration-500 ease-in-out relative z-0"
                        leave="duration-500 ease-in-out relative z-0"
                        enterFrom="transform max-h-0 opacity-0"
                        enterTo="transform max-h-[500px] opacity-100"
                        leaveFrom="transform max-h-[500px] opacity-100"
                        leaveTo="transform max-h-0 opacity-0"
                        show={open}
                        as="div"
                      >
                        <Disclosure.Panel className="px-4 py-4">
                          <Markdown content={item.attributes.description} />
                        </Disclosure.Panel>
                      </Transition>
                    </dd>
                  </dl>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
