'use client'

import { GsapContext, GsapContextProps } from '@/context'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState, type HTMLAttributes } from 'react'

import { bannerImageAtom } from '@/lib/atoms'
import { imageLoader } from '@/lib/utils'

import { MainUnderView } from '@/components/molecules/main/main-containers'

gsap.registerPlugin(ScrollTrigger)

const HeroBannerImage = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const pathname = usePathname()
  const gsapRef = useContext(GsapContext)
  const [bannerImage] = useAtom(bannerImageAtom)
  const [ref, setRef] = useState<GsapContextProps>()

  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  useGSAP(
    () => {
      if (!bannerImage) return
      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.hero',
            start: 'top top',
            end: 'bottom-=50 top',
            scrub: 2
          }
        })
        .set('.main-view-container', {
          '--top-bar-opacity': 0
        })
        .to('.main-view-container', {
          '--top-bar-opacity': 1
        })

      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.hero',
            start: 'top top',
            end: 'bottom-=50 top',
            scrub: 2
          }
        })
        .set('.main-view-container', {
          '--scroll': 0
        })
        .to('.main-view-container', {
          '--scroll': 0.06
        })
    },
    {
      scope: ref,
      dependencies: [bannerImage]
    }
  )

  if (
    !bannerImage ||
    !pathname.includes('/artist') ||
    pathname.split('/').length > 3
  )
    return null
  return (
    <MainUnderView>
      <div>
        <div className='hero-banner-image full-size-absolute bg-scroll-cover'>
          <Image
            src={bannerImage}
            alt={'Banner Image'}
            sizes='100vw'
            fill={true}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={true}
            loader={imageLoader}
          />
        </div>
        <div className='hero-banner-noise background-noise full-size-absolute bg-scroll-cover' />
      </div>
    </MainUnderView>
  )
}

HeroBannerImage.displayName = 'HeroBannerImage'

export { HeroBannerImage }
