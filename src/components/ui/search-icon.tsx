import { LucideProps, Search } from 'lucide-react'
import React, { memo } from 'react'

type IconProps = LucideProps & {
  active?: boolean
}
const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const SearchIcon = memo(({ active, name, ...props }: IconProps) => {
  // const LucideIcon = dynamic(dynamicIconImports[name])

  return <Search {...props} />
})

SearchIcon.displayName = 'SearchIcon'

const SearchNodes: [
  tag: string,
  attrs: { [key: string]: string | number | boolean }
][] = [
  ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
  [
    'ellipse',
    {
      cx: '10.95',
      cy: '10.95',
      rx: '4.2',
      ry: '4.2',
      fill: 'currentColor',
      key: '1qie3q2'
    }
  ],
  ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }]
]

const SearchActiveIcon = React.forwardRef<any, any>(
  (
    {
      color = 'currentColor',
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // const LucideIcon = dynamic(dynamicIconImports[name])

    return React.createElement(
      'svg',
      {
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        className: ['lucide', `lucide-search-active`, props.className].join(
          ' '
        ),
        ...props
      },
      [
        ...SearchNodes.map(([tag, attrs]) => React.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children])
      ]
    )
  }
)

SearchActiveIcon.displayName = 'SearchActiveIcon'

export { SearchActiveIcon, SearchIcon }
