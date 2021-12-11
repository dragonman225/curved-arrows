import React, { useCallback, useEffect, useState } from 'react'
import { useControls } from 'leva'
import { getArrow, getBoxToBoxArrow } from 'curved-arrows'
import { Arrow } from './Arrow'

enum Type {
  PointToPoint = 'pointToPoint',
  BoxToBox = 'boxToBox',
}

function App() {
  /** Leva controls. */
  const { type, padStart, padEnd } = useControls({
    type: { value: Type.BoxToBox, options: [Type.BoxToBox, Type.PointToPoint] },
    padStart: { value: 0, min: -20, max: 20, step: 1 },
    padEnd: { value: 9, min: -20, max: 20, step: 1 },
  })

  /** Fixed box. */
  const [box1, setBox1] = useState({
    x: window.innerWidth / 2 - 100,
    y: window.innerHeight / 2 - 50,
    w: 200,
    h: 100,
  })

  /** Fix fixed box in the center. */
  useEffect(() => {
    function onResize() {
      console.log('r')
      setBox1(b => ({
        ...b,
        x: window.innerWidth / 2 - b.w / 2,
        y: window.innerHeight / 2 - b.h / 2,
      }))
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  /** Movable box. */
  const [box2, setBox2] = useState({
    x: box1.x + 270,
    y: box1.y + 70,
    w: 200,
    h: 100,
  })

  /** Handle mouse. */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return

    function update(e: React.MouseEvent | MouseEvent) {
      setBox2(b => ({ ...b, x: e.clientX - b.w / 2, y: e.clientY - b.h / 2 }))
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
      setBox2(b => ({
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

  /** Get arrow data. */
  const options = { padStart, padEnd }
  const pointToPointArrow = getArrow(box1.x, box1.y, box2.x, box2.y, options)
  const boxToBoxArrow = getBoxToBoxArrow(
    box1.x,
    box1.y,
    box1.w,
    box1.h,
    box2.x,
    box2.y,
    box2.w,
    box2.h,
    options
  )

  return (
    <div className="app" onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
      {type === Type.BoxToBox && (
        <>
          <div
            key="box1"
            className="box"
            style={{
              transform: `translate(${box1.x}px, ${box1.y}px)`,
              width: box1.w,
              height: box1.h,
            }}
          />
          <div
            key="box2"
            className="box"
            style={{
              transform: `translate(${box2.x}px, ${box2.y}px)`,
              width: box2.w,
              height: box2.h,
            }}
          />
        </>
      )}
      <Arrow
        arrowDescriptor={
          type === Type.BoxToBox ? boxToBoxArrow : pointToPointArrow
        }
      />
    </div>
  )
}

export default App
