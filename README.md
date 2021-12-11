# Curved Arrows

A set of functions for drawing S-curved arrows between points and shapes.

- [`getArrow`](#getarrowx0-y0-x1-y1-options) - For point-to-point arrows.
- [`getBoxToBoxArrow`](#getboxtoboxarrowx0-y0-w0-h0-x1-y1-w1-h1-options) - For rectangle-to-rectangle arrows.

![demo animation](/demo_animation.gif)

## Installation

```
npm i curved-arrows
```

_or_

```
yarn add curved-arrows
```

## Usage

The functions in this library provide only the information needed to draw an arrow. You'll need to draw the arrow yourself using your technology of choice. See below for an example React component with SVG.

### `getArrow(x0, y0, x1, y1, options)`

The `getArrow` function accepts the position of two points and returns an array containing information for:

- four points: a start, end, and two control points
- two angles: end and start

You can use this information to draw an S-curve and arrow heads. You can use the options object to tweak the return values.

```js
const arrowHeadSize = 9
const arrow = getArrow(0, 0, 100, 200, {
  padStart: 0,
  padEnd: arrowHeadSize,
})
const [sx, sy, c1x, c1y, c2x, c2y ex, ey, ae, as] = arrow
```

#### Arguments

| Argument | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `x0`     | number | The x position of the starting point.                                       |
| `y0`     | number | The y position of the starting point.                                       |
| `x1`     | number | The x position of the ending point.                                         |
| `y1`     | number | The y position of the ending point.                                         |
| `options`| object | An (optional) object containing one or more of the options described below. |

#### Options

| Option       | Type    | Default | Description                                                                                                                                                    |
| ------------ | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `padStart`   | number  | 0       | How far the arrow's starting point should be from the provided start point.                                                                                    |
| `padEnd`     | number  | 0       | How far the arrow's ending point should be from the provided end point.                                                                                        |

#### Returns

| Argument | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `sx`     | number | The x position of the (padded) starting point.   |
| `sy`     | number | The y position of the (padded) starting point.   |
| `c1x`    | number | The x position of the control point of the starting point.   |
| `c1y`    | number | The y position of the control point of the starting point.   |
| `c2x`    | number | The x position of the control point of the ending point.     |
| `c2y`    | number | The y position of the control point of the ending point.     |
| `ex`     | number | The x position of the (padded) ending point.     |
| `ey`     | number | The y position of the (padded) ending point.     |
| `ae`     | number | The angle (in degree) for an ending arrowhead.   |
| `as`     | number | The angle (in degree) for a starting arrowhead.  |

## Example: A React Arrow Component

```jsx
// TODO
```

---

### `getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options)`

The `getBoxToBoxArrow` function accepts the position and dimensions of two boxes (or rectangles) and returns an array containing information for:

- four points: a start, end, and two control points
- two angles: end and start

You can use this information to draw an S-curve and arrow heads. You can use the options object to tweak the return values.

**Note:** The options and values returned by `getBoxToBoxArrow` are in the same format as the options and values for `getArrow`.

```js
// TODO
```

#### Arguments

| Argument | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `x0`     | number | The x position of the first rectangle.                                      |
| `y0`     | number | The y position of the first rectangle.                                      |
| `w0`     | number | The width of the first rectangle.                                           |
| `h0`     | number | The height of the first rectangle.                                          |
| `x1`     | number | The x position of the second rectangle.                                     |
| `y1`     | number | The y position of the second rectangle.                                     |
| `w1`     | number | The width of the second rectangle.                                          |
| `h1`     | number | The height of the second rectangle.                                         |
| `options`| object | An (optional) object containing one or more of the options described below. |

#### Options

See options in `getArrow` above. (Both functions use the same options object.)

#### Returns

See returns in `getArrow` above. (Both functions return the same set of values.)

## Example: A React Box-to-box Arrow Component

```jsx
// TODO
```

## Author

[@dragonman225](https://twitter.com/dragonman225)