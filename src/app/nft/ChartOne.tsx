'use client'

import { ReactElement } from 'react'
import { ChartData } from 'chart.js'
import styled from 'styled-components'

import { FormText, View } from '@/components/server'
import { COLOR } from '@/consts'
import { FormChart } from '@/components/client'

const StyledContainer = styled(View)`
  flex: 1;
  padding: 20px 32px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
`

type ChartOneProps = {
  text: string;
  value : number;
};

const ChartOne: React.FC<ChartOneProps> = ({ text, value }) => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  function formatCurrency(value:any) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: labels.map(() => Math.floor(Math.random() * 1000 - 1000)),
        borderColor: COLOR.core._500,
        backgroundColor: COLOR.core._500,
      },
    ],
  }

  return (
    <StyledContainer>
      <View className="gap-2 pb-4">
        <FormText fontType="B.14">{text}</FormText>
        <FormText fontType="B.20">$ {formatCurrency(value)}</FormText>
      </View>
      <FormChart.Line
        data={data}
        options={{
          plugins: { legend: { display: false } },
          aspectRatio: 4,
        }}
      />
    </StyledContainer>
  )
}

export default ChartOne
