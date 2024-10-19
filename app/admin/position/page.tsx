import Position from '@/components/Pages/Position'
import { PositionProvider } from '@/context/PositionContext'
import React from 'react'

export default function PositionPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-2xl font-semibold ">Position</h1>
      <PositionProvider>
        <Position/>
      </PositionProvider>
    </div>
  )
}
