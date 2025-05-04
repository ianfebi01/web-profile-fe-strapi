'use client'
import DefaultCategories from '@/components/DefaultCategories'
import AddTransaction from '@/components/Modal/AddTransaction'
import NoDataFound from '@/components/NoDataFound'
import { IFilter, useGetDatas } from '@/lib/hooks/api/cashFlow'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { cn } from '@/lib/utils'
import formatCurency from '@/utils/format-curency'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const CashFlow = () => {
  const { month, year, spaceMonthYear } = useFormatDate()

  const date = new Date()
  const [filter, setFilter] = useState<IFilter>({
    month: month(date),
    year: year(date),
  })

  const { data, isLoading } = useGetDatas(filter)

  const mockLoop = new Array(6).fill(0)

  const changeMonth = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      setFilter((prev) => ({ ...prev, month: String(Number(prev.month) - 1) }))
    } else if (type === 'next') {
      setFilter((prev) => ({ ...prev, month: String(Number(prev.month) + 1) }))
    }
  }

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2 items-center">
          <button
            className="hover:text-white-overlay text-white-overlay-2 transition-default"
            onClick={() => changeMonth('prev')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h2 className="h3 font-normal m-0">
            {spaceMonthYear(new Date(`${filter.year}-${filter.month}-01`))}
          </h2>
          <button
            className="hover:text-white-overlay text-white-overlay-2 transition-default"
            onClick={() => changeMonth('next')}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="grow"></div>
        <AddTransaction />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
        {isLoading &&
          mockLoop.map((_item, i) => (
            <div
              key={i}
              className="animate-pulse h-32 w-full rounded-lg bg-dark-secondary"
            />
          ))}
        {!isLoading &&
          data?.transactions &&
          data?.transactions?.length > 0 &&
          data?.transactions.map((item, index) => (
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
              <table border={0} className="border-none table-auto w-full">
                <tbody>
                  {item.transactions.map((subItem, subIndex) => (
                    <tr key={subIndex}>
                      <td
                        className="p-0 text-white-overlay"
                        style={{ width: '1px', whiteSpace: 'nowrap' }}
                      >
                        <DefaultCategories name={subItem.mm_category?.name} />
                      </td>
                      <td className="px-4">
                        <p className="m-0">{subItem.description}</p>
                      </td>
                      <td className="p-0 text-right">
                        <p
                          className={cn('m-0', {
                            'text-blue-400': subItem.type === 'income',
                            'text-orange': subItem.type === 'expense',
                          })}
                        >
                          {formatCurency(subItem.amount)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
      {!isLoading && data?.transactions.length === 0 && <NoDataFound />}
    </div>
  )
}

export default CashFlow
