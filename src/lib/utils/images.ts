import { ImageLoaderProps } from 'next/image'

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const imageUrl = new URL(src)
  return imageUrl.search
    ? `${src}&w=${width}&q=${quality || 75}`
    : `${src}?w=${width}&q=${quality || 75}`
}
