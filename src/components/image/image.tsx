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
    title,
    priority,
    itemProp,
    legacy = false,
    sizes,
    fill = true,
    placeholder,
    blurDataURL,
    id,
    referrerPolicy,
    ...rest
  } = props

  if (!src) {
    return null
  }

  return (
    <NewNextImage
      id={id}
      itemProp={itemProp}
      // placeholder={placeholder || 'blur'}
      sizes={sizes}
      fill={fill}
      priority={priority}
      title={title}
      width={width}
      height={height}
      alt={alt}
      src={src}
      className={className}
      loader={myLoader}
      referrerPolicy={referrerPolicy}
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


const myLoader = ({src, width, quality}: any) => {
  return `${src}?w=${width}&q=${quality || 50}`
}

export default Image;