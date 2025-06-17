import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faBriefcase,
  faBriefcaseMedical,
  faCar,
  faEllipsis,
  faFileInvoice,
  faGift,
  faHouse,
  faMasksTheater,
  faPeopleGroup,
  faShirt,
  faSprayCanSparkles,
  faUserGraduate,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'
import React, { FunctionComponent } from 'react'

type WrapperProps = {
  text: string
  icon?: IconProp
}

const Wrapper = ( { text, icon }: WrapperProps ) => (
  <div className="flex flex-wrap gap-2 justify-center items-center w-fit">
    {!!icon && (
      <div className='w-4 h-4'>
        <FontAwesomeIcon icon={icon}
          className="text-orange"
        />
      </div>
    )}
    <p className="m-0 text-inherit break-all">{text}</p>
  </div>
)

interface Props {
  name: string
}

const DefaultCategories: FunctionComponent<Props> = ( { name } ) => {
  const t = useTranslations( 'mm_categories' )

  switch ( name ) {
  case 'food':
    return (
      <>
        <Wrapper text={t( 'food' )}
          icon={faUtensils}
        />
      </>
    )
  case 'social-life':
    return (
      <>
        <Wrapper text={t( 'social_life' )}
          icon={faPeopleGroup}
        />
      </>
    )
  case 'apparel':
    return (
      <>
        <Wrapper text={t( 'apparel' )}
          icon={faShirt}
        />
      </>
    )
  case 'culture':
    return (
      <>
        <Wrapper text={t( 'culture' )}
          icon={faMasksTheater}
        />
      </>
    )
  case 'beauty':
    return (
      <>
        <Wrapper text={t( 'beauty' )}
          icon={faSprayCanSparkles}
        />
      </>
    )
  case 'health':
    return (
      <>
        <Wrapper text={t( 'health' )}
          icon={faBriefcaseMedical}
        />
      </>
    )
  case 'education':
    return (
      <>
        <Wrapper text={t( 'education' )}
          icon={faUserGraduate}
        />
      </>
    )
  case 'gift':
    return (
      <>
        <Wrapper text={t( 'gift' )}
          icon={faGift}
        />
      </>
    )
  case 'house-hold':
    return (
      <>
        <Wrapper text={t( 'house_hold' )}
          icon={faHouse}
        />
      </>
    )
  case 'work':
    return (
      <>
        <Wrapper text={t( 'work' )}
          icon={faBriefcase}
        />
      </>
    )
  case 'bill-subscription':
    return (
      <>
        <Wrapper text={t( 'bill_subscription' )}
          icon={faFileInvoice}
        />
      </>
    )
  case 'transportation':
    return (
      <>
        <Wrapper text={t( 'transportation' )}
          icon={faCar}
        />
      </>
    )
  case 'other':
    return (
      <>
        <Wrapper text={t( 'other' )}
          icon={faEllipsis}
        />
      </>
    )
  default:
    return (
      <>
        <Wrapper text={name} />
      </>
    )
  }
}

export default DefaultCategories
