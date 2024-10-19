'use client'
import { faBusinessTime, faCode, faPenRuler, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import React from 'react'
import ButtonSignOut from '../Buttons/ButtonSignOut'
import { useSession } from 'next-auth/react'
import ButtonSidebar from '../Buttons/ButtonSidebar'

const Sidebar = () => {

  const { data:session } = useSession()
	
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen py-7 transition-transform sm:translate-x-0 bg-dark-secondary flex flex-col"
      aria-label="Sidebar"
    >
      <div className=" mb-6 pb-6 mx-3 flex items-center gap-4 border-b border-white/25">
        <Image src="/Logo.svg"
          alt="Logo image"
          width={40}
          height={40}
        />
        <div className="flex gap-2">
          <h1 className="leading-none m-0 text-2xl font-bold">IAN</h1>
          <h1 className="text-orange leading-none m-0 text-2xl font-bold">
            FEBI
          </h1>
        </div>
      </div>
      <div className="grow-[1] px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <ButtonSidebar text='Profile'
              icon={faUser}
              path="/admin"
            />
          </li>
          <li>
            <ButtonSidebar text='Portofolio'
              icon={faCode}
              path="/admin/portofolio"
            />
          </li>
          <li>
            <ButtonSidebar text='Position'
              icon={faBusinessTime}
              path="/admin/position"
            />
          </li>
          <li>
            <ButtonSidebar text='Skill'
              icon={faPenRuler}
              path="/admin/skill"
            />
          </li>
          <li>
            <ButtonSidebar text='Experience'
              icon={faSuitcase}
              path="/admin/experience"
            />
          </li>
        </ul>
      </div>
      <div className="px-3">
        <div>
          <div className='bg-transparent hover:bg-dark border border-white/25 hover:border-transparent p-2 transition-all ease-in-out duration-500 text-base text-white flex items-center gap-2 w-full rounded-lg'>
            <Image src={session?.user?.avatar as string}
              alt='Avatar'
              width={40}
              height={40}
              className='border border-none rounded-full overflow-hidden'
            />
            <div className='flex flex-col gap-2'>
              <h2 className='line-clamp-1 text-xs'>{session?.user?.name}</h2>
              <p className='line-clamp-1 text-[0.5rem] leading-none'>{session?.user?.email}</p>
            </div>
            <ButtonSignOut iconOnly/>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
