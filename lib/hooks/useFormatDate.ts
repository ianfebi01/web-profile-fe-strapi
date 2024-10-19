import { differenceInYears, format } from 'date-fns'

export const useFormatDate = () => {
  const normal = ( date: Date | string ) => {
    return format( new Date( date ), 'dd:MM:yyyy' )
  }
  const year = ( date: Date | string ) => {
    return format( new Date( date ), 'yyyy' )
  }
  const slash = ( date: Date | string ) => {
    return format( new Date( date ), 'dd/MM/yyyy' )
  }

  const time = ( date: Date | string ) => {
    return format( new Date( date ), 'HH:mm:ss' )
  }

  const spaceMonthText = ( date: Date | string ) => {
    return format( new Date( date ), 'dd MMM yyyy' )
  }

  const birthDayAndYear = ( date: Date | string ) => {
    return `${format( new Date( date ), 'dd MMM yyyy' )} (${calculateAge( new Date( date ) )} tahun)`
  }

  const startDateNoTime = ( date: Date | string ) => {
    return format( new Date( date ), 'yyyy-MM-dd HH:mm:ss' )
  }
  const endDateNoTime = ( date: Date | string ) => {
    return format( new Date( date ), 'yyyy-MM-dd' ) + ' 23:59:59'
  }

  return {
    slash,
    normal,
    time,
    spaceMonthText,
    birthDayAndYear,
    startDateNoTime,
    endDateNoTime,
    year
  }
}

function calculateAge( dob: Date ) {
  const age = differenceInYears( new Date(), dob )
  
  return age
}
