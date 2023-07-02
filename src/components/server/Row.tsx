import { HTMLAttributes, ReactElement } from 'react'
import View from './View'

const Row = ({
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <View style={{ flexDirection: 'row', ...style }} {...rest} />
)

export default Row
