'use client'
import { useGetDatas } from '@/lib/hooks/api/cashFlow'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { cn } from '@/lib/utils'
import React from 'react'

const CashFlow = () => {
  const { data, isLoading } = useGetDatas('2025-04')

  const { month } = useFormatDate()

  const formatCurency = (value: number) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
  }

  const mockLoop = new Array(6).fill(0)
  return (
    <div>
      {isLoading && mockLoop.map((item) => <div key={item}>Loading</div>)}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
        {data?.transactions.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-dark-secondary shadow-xl rounded-lg flex flex-col gap-4"
          >
            <div className="flex gap-2 items-center">
              <h2 className="m-0">{item.day}</h2>
              <div className="grow" />
              <div className="w-28 text-right text-blue-400">
                <p className="m-0">{formatCurency(item.income)}</p>
              </div>
              <div className="w-28 text-right text-orange">
                <p className="m-0">{formatCurency(item.expense)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {item.transactions.map((subItem, subIndex) => (
                <div
                  className="flex flex-row gap-4 items-center"
                  key={subIndex}
                >
                  <p className="m-0">{subItem.mm_category.name}</p>
                  <p className="m-0">{subItem.description}</p>
                  <div className="grow" />
                  <p className={cn(
                    'm-0',
                    [
                        subItem.type === 'income' && 'text-blue-400',
                        subItem.type === 'expense' && 'text-orange',
                    ]
                  )}>{formatCurency(subItem.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CashFlow
