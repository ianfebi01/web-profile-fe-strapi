'use client'
import React, { FunctionComponent, ReactNode } from 'react'
import Spinner from '../Icons/Spinner'
import { cn } from '@/lib/utils'

interface Props {
  disabled?: boolean | undefined
  children: ReactNode
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  className?: string
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'icon' | 'iconOnly' | 'link' | 'error'
}

const Button2: FunctionComponent<Props> = ( props ) => {
  const {
    disabled,
    children,
    onClick,
    type = 'button',
    className,
    loading,
    variant = 'primary',
  } = props

  return (
    <button
      className={cn(
        'py-2 px-4 text-xs flex items-center gap-2 rounded-lg border border-transparent transition-default w-fit',
        ' hover:border-white/25',
        // variant
        [
          variant === 'primary' && ['bg-dark text-white'],
          variant === 'error' && [
            'text-white border hover:border-red-400 border-red-500 bg-transparent',
          ],
          variant === 'secondary' && ['bg-dark-secondary text-white'],
          variant === 'icon' && [
            'w-8 aspect-square p-2',
            'flex items-center justify-center',
            'text-white border hover:border-white/25 border-transparent bg-transparent',
          ],
          variant === 'iconOnly' && [
            'w-fit p-0',
            'hover:opacity-75 focus:opacity-75',
            'text-white border-none',
          ],
          variant === 'link' && [
            'w-fit p-0',
            'hover:opacity-75 focus:opacity-75',
            'text-white border-none',
          ],
        ],
        disabled && 'bg-dark/50 text-white/50',
        className
      )}
      onClick={() => ( onClick ? onClick() : null )}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : ''}

      {variant === 'iconOnly' && loading ? '' : children}
    </button>
  )
}

export default Button2
