import componentResolver from '@/utils/component-resolver'

interface Props {
  sections: any
//   banners: Attribute.DynamicZone<
//     [
//       'banner-components.banner-standard',
//       'banner-components.carousel',
//       'banner-components.profile-banner'
//     ]
//   > &
//     Attribute.SetPluginOptions<{
//       i18n: {
//         localized: true
//       }
//     }> &
//     Attribute.SetMinMax<
//       {
//         max: 1
//       },
//       number
//     >
}

const Sections = ( { sections }: Props ) => {
  return sections.map( ( sections: any, index: number ) => componentResolver( sections, index ) )
}

export default Sections
