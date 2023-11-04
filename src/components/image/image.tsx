import React from 'react'
import {ImageProps} from './image.props'
import {default as NewNextImage} from 'next/image'

const Image = (props: ImageProps) => {

  const {
    className,
    layout,
    src,
    alt,
    objectFit,
    width,
    height,
    priority,
    fill = false,
    ...rest
  } = props

  if (!src) {
    return null
  }

  return (
    <NewNextImage
      src={src}
      fill={fill}
      priority={priority}
      width={width}
      height={height}
      alt={alt}
      className={className}
      {...rest}
    />
  )
}

Image.defaultProps = {
  objectFit: 'contain',
  layout: 'fill',
  legacy: false,
  fill: true,
}

export default Image;