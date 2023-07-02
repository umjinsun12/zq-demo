import { FontType } from '@/types'
import { CSSProperties } from 'react'

const getFontStyle = (fontType: FontType): CSSProperties => {
  const weightType = fontType.split('.')[0]
  const fontSize = Number(fontType.split('.')[1])

  let fontWeight = 400
  if (weightType === 'B') {
    fontWeight = 600
  }

  return { fontSize, fontWeight }
}

export default {
  getFontStyle,
}
