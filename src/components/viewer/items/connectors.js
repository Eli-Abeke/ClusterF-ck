import React from 'react'

export default function connectors(props) {
  props.x1 = x1
  props.x2 = x2
  props.y1 = y1
  props.y2 = y2
  return (
    <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>
  )
}
 