"use client";
import { STYLE } from '@/consts'
import { FontType } from '@/types'
import { HTMLAttributes, ReactElement } from 'react'

type FormTextProps = {
  fontType?: FontType
} & HTMLAttributes<HTMLSpanElement>

const FormText = ({
  fontType = 'R.16',
  children,
  color,
  style,
  ...rest
}: FormTextProps): ReactElement => {
  const fontStyle = STYLE.getFontStyle(fontType)

  return (
    <span style={{ color, ...fontStyle, ...style }} {...rest}>
      {children}
    </span>
  )
}

export default FormText
