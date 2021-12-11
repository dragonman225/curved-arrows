import * as React from 'react'
import { stylesheet } from 'typestyle'

interface Props {
  arrowDescriptor: number[]
}

const styles = stylesheet({
  Arrow: {
    pointerEvents: 'none',
    overflow: 'visible',
  },
})

export function Arrow({ arrowDescriptor }: Props): JSX.Element {
  const arrowHeadSize = 9
  const color = 'black'
  const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae] = arrowDescriptor

  return (
    <svg
      className={styles.Arrow}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`}
        stroke={color}
        strokeWidth={arrowHeadSize / 2}
        fill="none"
      />
      <polygon
        points={`0,${-arrowHeadSize} ${arrowHeadSize *
          2},0, 0,${arrowHeadSize}`}
        transform={`translate(${ex}, ${ey}) rotate(${ae})`}
        fill={color}
      />
    </svg>
  )
}
