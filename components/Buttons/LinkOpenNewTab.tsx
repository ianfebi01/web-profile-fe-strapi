'use client'
import { openNewTab } from '@/lib/utils'
import Button2 from './Button2'
import { ReactElement } from 'react'

interface Props {
  url: string
  label: string
  icon: ReactElement
  className?: string
}
const LinkOpenNewTab = ( { url, label, icon, className = '' }: Props ) => {
  return (
    <Button2
      variant="link"
      type="button"
      className={className}
      onClick={() => openNewTab( url )}
    >
      {icon}
      {label}
    </Button2>
  )
}

export default LinkOpenNewTab
