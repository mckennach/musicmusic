'use client'

import { type HTMLAttributes } from 'react'

import { GsapContextProps, useGsapContext } from '@/context'

import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { bannerImageAtom } from '@/lib/atoms'
import { imageLoader } from '@/lib/utils'

import { MainUnderView } from '@/components/ui/main-containers'

const HeroBannerImage = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const pathname = usePathname()
  const [bannerImage] = useAtom(bannerImageAtom)
  const gsapRef = useGsapContext()
  const [ref, setRef] = useState<GsapContextProps>()

  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  // useGSAP(
  //   () => {
  //     if (!bannerImage || !pathname.includes('/artist')) return null
  //     gsap
  //       .timeline({
  //         scrollTrigger: {
  //           scroller: '.main-view-container__viewport',
  //           trigger: '.under-header',
  //           start: 'top top',
  //           end: 'bottom bottom',
  //           scrub: 2
  //           // markers: true
  //         }
  //       })
  //       .set('.hero-banner-image', {
  //         '--scroll': 0,
  //       })
  //       .to('.hero-banner-image', {
  //         '--scroll': .06
  //       })

  //       gsap.timeline({
  //         scrollTrigger: {
  //           scroller: '.main-view-container__viewport',
  //           trigger: '.under-header',
  //           start: 'top top',
  //           end: 'bottom bottom',
  //           scrub: 1
  //           // markers: true
  //         }
  //       }).set('.main-view-container__under-main-view', {
  //         '--top-bar-opacity': 0
  //       })
  //       .to('.main-view-container__under-main-view', {
  //         '--top-bar-opacity': 1
  //       })

  //   },
  //   {
  //     scope: ref,
  //     dependencies: [ref]
  //   }
  // )

  if (!bannerImage || !pathname.includes('/artist')) return null
  return (
    <MainUnderView>
      <div>
        <div className='hero-banner-image full-size-absolute bg-scroll-cover'>
          <Image
            src={bannerImage}
            alt={'Banner Image'}
            sizes='100vw'
            fill={true}
            style={{ objectFit: 'cover' }}
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
