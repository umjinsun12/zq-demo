import { HTMLAttributes, ReactElement } from 'react'

const View = ({
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div
    style={{ display: 'flex', flexDirection: 'column', ...style }}
    {...rest}
  />
)

export default View
