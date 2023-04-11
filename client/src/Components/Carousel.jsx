import React from 'react'

export default function Carousel(props) {
  return (
    <div className='overflow-hidden relative'>
      <div className='flex'>{props.slides}</div>
    </div>
  )
}
