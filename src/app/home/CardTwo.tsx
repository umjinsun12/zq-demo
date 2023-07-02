'use client'

import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR } from '@/consts'
import { FormText, View } from '@/components/server'
import Card from '@/components/server/Card'

const StyledCardItem = styled(View)`
  border-radius: 20px;
  background-color: ${COLOR.core._800};
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  border: 2px solid #373742;
  gap: 12px;
`

const CardOne = (): ReactElement => {
  return (
    <Card className="gap-4 grid-rows-3">
      <StyledCardItem>
        <FormText fontType="R.14">Current APR 16.81%</FormText>
        <FormText fontType="R.24">Earn rewards in USDT & ZQUAL</FormText>
      </StyledCardItem>
      <StyledCardItem>
        <FormText fontType="R.14">Fixed USDT Rewards APR</FormText>
        <FormText fontType="R.24">5.00%</FormText>
      </StyledCardItem>
      <StyledCardItem>
        <FormText fontType="R.14">Flexible ZQUAL Rewards APR</FormText>
        <FormText fontType="R.24">3.17%</FormText>
      </StyledCardItem>
    </Card>
  )
}

export default CardOne
