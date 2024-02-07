import { columnCountAtom, mainPanelWidthAtom, rowCountAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { HTMLAttributes, useEffect } from 'react'
import useResizeObserver from 'use-resize-observer'
interface MainResizeObserverProps extends HTMLAttributes<HTMLDivElement> {}

export function MainResizeObserver({
  className,
  ...props
}: MainResizeObserverProps) {
  const { ref, width = 0, height = 0 } = useResizeObserver<HTMLDivElement>()
  const [mainPanelWidth, setMainPanelWidth] = useAtom(mainPanelWidthAtom)
  const [columnCount, setColumnCount] = useAtom(columnCountAtom)
  const [rowCount, setRowCount] = useAtom(rowCountAtom)

  useEffect(() => {
    if (width > 0 && height > 0) {
      const mainPanelWidth = width
      const columnCount = Math.floor(mainPanelWidth / 300)
      const rowCount = Math.ceil(height / 300)

      if (width >= 1599) {
        document.documentElement.style.setProperty('--column-count', '8')
        document.documentElement.style.setProperty('--item-height', '80px')
        setColumnCount(8)
      } else if (width >= 1399) {
        document.documentElement.style.setProperty('--column-count', '7')
        document.documentElement.style.setProperty('--item-height', '80px')
        setColumnCount(7)
      } else if (width >= 1199) {
        document.documentElement.style.setProperty('--item-height', '64px')
        document.documentElement.style.setProperty('--column-count', '6')
        setColumnCount(6)
      } else if (width >= 1099) {
        document.documentElement.style.setProperty('--item-height', '64px')
        document.documentElement.style.setProperty('--column-count', '6')
        setColumnCount(6)
      } else if (width >= 999) {
        document.documentElement.style.setProperty('--item-height', '48px')
        document.documentElement.style.setProperty('--column-count', '5')
        setColumnCount(5)
      } else if (width >= 699) {
        document.documentElement.style.setProperty('--item-height', '48px')
        document.documentElement.style.setProperty('--column-count', '4')
        setColumnCount(4)
      } else if (width >= 499) {
        document.documentElement.style.setProperty('--item-height', '48px')
        document.documentElement.style.setProperty('--column-count', '3')
        document.documentElement.style.setProperty('--grid-gap', '18px')
        setColumnCount(3)
      } else {
        document.documentElement.style.setProperty('--grid-gap', '12px')
        document.documentElement.style.setProperty('--column-count', '2')
        document.documentElement.style.setProperty('--item-height', '48px')
        setColumnCount(2)
      }
      setMainPanelWidth(mainPanelWidth)
    }
  }, [width, height, setMainPanelWidth, setColumnCount, setRowCount])

  useEffect(() => {
    if (columnCount === 7) {
    } else if (columnCount === 6) {
    } else if (columnCount === 5) {
    } else if (columnCount === 4) {
    } else if (columnCount === 3) {
    } else if (columnCount === 2) {
    } else {
    }
  }, [mainPanelWidth, columnCount, rowCount])

  return (
    <div
      ref={ref}
      className={cn(
        `main-view-container__resize-observer-host`,
        width > 0 && height > 0 ? 'observed' : '',
        className
      )}
      {...props}
    >
      <div
        className='main-view-container__resize-observer'
        style={{
          left: 0,
          right: 'auto'
        }}
      />
    </div>
  )
}
