import { ReactElement } from 'react'
import Image, { ImageProps } from 'next/image'
import _ from 'lodash'

const FormImg = ({
  size,
  width,
  height,
  ...rest
}: { size: number } & Omit<ImageProps, 'alt'>): ReactElement => (
  <Image
    width={size || width}
    height={size || height}
    alt={_.toString(rest.src)}
    {...rest}
  />
)

export default FormImg
