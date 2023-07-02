'use client'

import { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import { View } from '../server'

const StyledContainer = styled(View)`
  border-radius: 10px;
  overflow: hidden;
`

const StyledButton = styled.button`
  position: relative;
  height: 48px;
  border-radius: 10px;

  ::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(
      90deg,
      #f38e78 0%,
      #bd7bff 31.25%,
      #6ebaf5 77.6%,
      #59e4da 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  :hover {
    background: linear-gradient(
      90deg,
      #f38e78 0%,
      #bd7bff 31.25%,
      #6ebaf5 77.6%,
      #59e4da 100%
    );
  }
`

type FormButtonProps = {
  size?: 'sm' | 'md' | 'lg'
} & HTMLAttributes<HTMLButtonElement>

const FormButton = ({
  size = 'md',
  style,
  ...rest
}: FormButtonProps): ReactElement => {
  const height = size === 'lg' ? 56 : size === 'md' ? 48 : 40
  return (
    <StyledContainer>
      <StyledButton style={{ height, ...style }} {...rest} />
    </StyledContainer>
  )
}

export default FormButton
