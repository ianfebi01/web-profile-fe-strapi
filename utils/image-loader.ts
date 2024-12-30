import { ImageLoaderProps } from "next/image"

const imageLoader = ( { src, width, quality }: ImageLoaderProps ) => {
  const transformation = [`w_${width}`, `q_${quality || 75}`].join( ',' )
  if ( src.includes( '/upload/' ) ) {
    return src.replace( '/upload/', `/upload/${transformation}/` )
  }

  return `${src}?w=${width}&q=${quality || 75}`
}

export default imageLoader