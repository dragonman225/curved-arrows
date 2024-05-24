import React, { useCallback, useEffect, useState } from 'react'
import { folder, useControls } from 'leva'
import { ArrowOptions, getArrow, getBoxToBoxArrow } from 'curved-arrows'
import {
  RectSide,
  distanceOf,
  growBox,
  isPointInBox,
  Vec2,
  Box,
  /** create-react-app is unable to import from 'curved-arrows/src/utils' */
} from './curved-arrows/utils'
import { Arrow } from './Arrow'
import { Line } from './Line'

enum Type {
  PointToPoint = 'Point to Point',
  BoxToBox = 'Box to Box',
}

function App() {
  /** Leva controls. */
  const {
    type,
    showWhy,
    showArrow,
    padStart,
    padEnd,
    controlPointStretch,
    canStartAtTop,
    canStartAtLeft,
    canStartAtBottom,
    canStartAtRight,
    canEndAtTop,
    canEndAtLeft,
    canEndAtBottom,
    canEndAtRight,
  } = useControls({
    type: {
      value: Type.BoxToBox,
      options: [Type.BoxToBox, Type.PointToPoint],
      label: 'Type',
    },
    showWhy: { value: false, label: 'Show Why' },
    showArrow: { value: true, label: 'Show Arrow' },
    padStart: { value: 0, min: -20, max: 20, step: 1 },
    padEnd: { value: 9, min: -20, max: 20, step: 1 },
    controlPointStretch: { value: 50, min: 0, max: 300 },
    allowedStartSides: folder({
      canStartAtTop: { value: true, label: 'top'},
      canStartAtLeft: { value: true, label: 'left'},
      canStartAtBottom: { value: true, label: 'bottom'},
      canStartAtRight: { value: true, label: 'right'},
    }),
    allowedEndSides: folder({
      canEndAtTop: { value: true, label: 'top'},
      canEndAtLeft: { value: true, label: 'left'},
      canEndAtBottom: { value: true, label: 'bottom'},
      canEndAtRight: { value: true, label: 'right'},
    })
  })

  /** Fixed start box. */
  const [startBox, setStartBox] = useState({
    x: window.innerWidth / 2 - 100,
    y: window.innerHeight / 2 - 50,
    w: 200,
    h: 80,
  })

  /** Fix start box in the center. */
  useEffect(() => {
    function onResize() {
      console.log('r')
      setStartBox(b => ({
        ...b,
        x: window.innerWidth / 2 - b.w / 2,
        y: window.innerHeight / 2 - b.h / 2,
      }))
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  /** Movable end box. */
  const [endBox, setEndBox] = useState({
    x: startBox.x + 270,
    y: startBox.y + 70,
    w: 180,
    h: 80,
  })

  /** Handle mouse. */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return

    function update(e: React.MouseEvent | MouseEvent) {
      setEndBox(b => ({ ...b, x: e.clientX - b.w / 2, y: e.clientY - b.h / 2 }))
    }

    function unlisten() {
      window.removeEventListener('mousemove', update)
      window.removeEventListener('mouseup', unlisten)
    }

    update(e)

    window.addEventListener('mousemove', update)
    window.addEventListener('mouseup', unlisten)
  }, [])

  /** Handle touch. */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 1) return

    function update(e: React.TouchEvent | TouchEvent) {
      setEndBox(b => ({
        ...b,
        x: e.touches[0].clientX - b.w / 2,
        y: e.touches[0].clientY - b.h / 2,
      }))
    }

    function unlisten() {
      window.removeEventListener('touchmove', update)
      window.removeEventListener('touchend', unlisten)
      window.removeEventListener('touchcancel', unlisten)
    }

    update(e)

    window.addEventListener('touchmove', update)
    window.addEventListener('touchend', unlisten)
    window.addEventListener('touchcancel', unlisten)
  }, [])

  const allowedStartSides: RectSide[] = [];
  const allowedEndSides: RectSide[] = [];

  if (canStartAtTop) { allowedStartSides.push('top') }
  if (canStartAtLeft) { allowedStartSides.push('left') }
  if (canStartAtBottom) { allowedStartSides.push('bottom') }
  if (canStartAtRight) { allowedStartSides.push('right') }
  if (canEndAtTop) { allowedEndSides.push('top') }
  if (canEndAtLeft) { allowedEndSides.push('left') }
  if (canEndAtBottom) { allowedEndSides.push('bottom') }
  if (canEndAtRight) { allowedEndSides.push('right') }
  
  /** Get arrow data. */
  const options: ArrowOptions = { padStart, padEnd, controlPointStretch, allowedStartSides, allowedEndSides }
  const pointToPointArrow = getArrow(
    startBox.x,
    startBox.y,
    endBox.x,
    endBox.y,
    options
  )
  const boxToBoxArrow = getBoxToBoxArrow(
    startBox.x,
    startBox.y,
    startBox.w,
    startBox.h,
    endBox.x,
    endBox.y,
    endBox.w,
    endBox.h,
    options
  )

  /** For explanation part. */

  /** Points of start box. */
  const startAtTop = {
    x: startBox.x + startBox.w / 2,
    y: startBox.y - 2 * (options.padStart ?? 0),
  }
  const startAtBottom = {
    x: startBox.x + startBox.w / 2,
    y: startBox.y + startBox.h + 2 * (options.padStart ?? 0),
  }
  const startAtLeft = {
    x: startBox.x - 2 * (options.padStart ?? 0),
    y: startBox.y + startBox.h / 2,
  }
  const startAtRight = {
    x: startBox.x + startBox.w + 2 * (options.padStart ?? 0),
    y: startBox.y + startBox.h / 2,
  }

  /** Points of end box. */
  const endAtTop = {
    x: endBox.x + endBox.w / 2,
    y: endBox.y - 2 * (options.padEnd ?? 0),
  }
  const endAtBottom = {
    x: endBox.x + endBox.w / 2,
    y: endBox.y + endBox.h + 2 * (options.padEnd ?? 0),
  }
  const endAtLeft = {
    x: endBox.x - 2 * (options.padEnd ?? 0),
    y: endBox.y + endBox.h / 2,
  }
  const endAtRight = {
    x: endBox.x + endBox.w + 2 * (options.padEnd ?? 0),
    y: endBox.y + endBox.h / 2,
  }

  type Coordinate = { x: number, y: number };

  const startPoints: Coordinate[] = [];
  const endPoints: Coordinate[] = []

  if (canStartAtTop) { startPoints.push(startAtTop) };
  if (canStartAtRight) { startPoints.push(startAtRight) };
  if (canStartAtBottom) { startPoints.push(startAtBottom) };
  if (canStartAtLeft) { startPoints.push(startAtLeft) };
  if (canEndAtTop) { endPoints.push(endAtTop) };
  if (canEndAtRight) { endPoints.push(endAtRight) };
  if (canEndAtBottom) { endPoints.push(endAtBottom) };
  if (canEndAtLeft) { endPoints.push(endAtLeft) };

  if (startPoints.length === 0) {
    startPoints.push(...[startAtTop, startAtRight, startAtBottom, startAtLeft,])
  }

  if (endPoints.length === 0) {
    endPoints.push(...[endAtTop, endAtRight, endAtBottom, endAtLeft,])
  }

  const keepOutZone = 15
  const lines: {
    id: string
    distance: number
    start: Vec2
    end: Vec2
    isUsable: boolean
  }[] = []
  let bestLine = '0-0'
  let shortestDistance = 1 / 0

  function isStartEndUsable(
    start: Vec2,
    end: Vec2,
    startBox: Box,
    endBox: Box
  ) {
    return !(
      isPointInBox(start, growBox(endBox, keepOutZone)) ||
      isPointInBox(end, growBox(startBox, keepOutZone))
    )
  }

  for (let startSideId = 0; startSideId < startPoints.length; startSideId++) {
    const startPoint = startPoints[startSideId]

    for (let endSideId = 0; endSideId < endPoints.length; endSideId++) {
      const endPoint = endPoints[endSideId]

      const distance = distanceOf(startPoint, endPoint)
      const isUsable = isStartEndUsable(startPoint, endPoint, startBox, endBox)
      const line = {
        id: `${startSideId}-${endSideId}`,
        distance,
        start: startPoint,
        end: endPoint,
        isUsable,
      }
      lines.push(line)
      if (isUsable && distance < shortestDistance) {
        shortestDistance = distance
        bestLine = line.id
      }
    }
  }

  return (
    <div className="app" onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
      {type === Type.BoxToBox && (
        <>
          <div
            key="startBox"
            className="box"
            style={{
              transform: `translate(${startBox.x}px, ${startBox.y}px)`,
              width: startBox.w,
              height: startBox.h,
            }}
          />
          <div
            key="endBox"
            className="box"
            style={{
              transform: `translate(${endBox.x}px, ${endBox.y}px)`,
              width: endBox.w,
              height: endBox.h,
            }}
          />
        </>
      )}
      <div>
        {showWhy &&
          lines.map(line => (
            <Line
              key={line.id}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              color={
                line.isUsable
                  ? bestLine === line.id
                    ? 'hsl(37deg, 87%, 68%)' // yellow
                    : 'hsl(138deg, 83%, 79%)' // green
                  : 'hsl(350deg, 100%, 77%)' // red
              }
              strokeWidth={bestLine === line.id ? 6 : 3}
              zIndex={bestLine === line.id ? 1 : 0}
            />
          ))}
      </div>
      {showArrow && (
        <Arrow
          arrowDescriptor={
            type === Type.BoxToBox ? boxToBoxArrow : pointToPointArrow
          }
          color="rgb(53, 47, 43)"
          zIndex={1}
        />
      )}
    </div>
  )
}

export default App
