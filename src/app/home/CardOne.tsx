'use client'

import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import { COLOR } from '@/consts'
import { FormText, View } from '@/components/server'
import Card from '@/components/server/Card'
import { usdcPoolAddress, zqPoolAddress } from '@/consts/pool'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js'

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

  const [poolValue, setPoolValue] = useState(0);
  const [usdcPoolValue, setUsdcPoolValue] = useState(0);

  async function getPoolValue(){
    const provider = new JsonRpcProvider(testnetConnection);
    
    try{
      const input = {
        id : zqPoolAddress,
        options : {"showContent":true}
      }
  
      let poolData : any = await provider.getObject(input);

      setPoolValue(parseInt(poolData.data.content.fields.balance) / Math.pow(10, 9));

    }catch(e){
      console.error('executeMoveCall failed', e);
    }
  }


  async function getUsdcPoolValue(){
    const provider = new JsonRpcProvider(testnetConnection);
    
    try{
      const input = {
        id : usdcPoolAddress,
        options : {"showContent":true}
      }
  
      let poolData : any = await provider.getObject(input);

      setUsdcPoolValue(parseInt(poolData.data.content.fields.balance) / Math.pow(10, 9));

    }catch(e){
      console.error('executeMoveCall failed', e);
    }
  }

  function formatCurrency(value:any) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
  }

  useEffect(() => {
    getPoolValue();
    getUsdcPoolValue();
  }, []);
  
  return (
    <Card className="gap-4 grid-rows-3">
      <StyledCardItem>
        <FormText fontType="R.14">Total Value Locked</FormText>
        <FormText fontType="R.24">$ {formatCurrency(29380 + usdcPoolValue + 24736 + poolValue)}</FormText>
      </StyledCardItem>
      <StyledCardItem>
        <FormText fontType="R.14">Total Minted Zquilibrium</FormText>
        <FormText fontType="R.24">{formatCurrency(127)}</FormText>
      </StyledCardItem>
      <StyledCardItem>
        <FormText fontType="R.14">Minimum Value To Mint Zquilibrium</FormText>
        <FormText fontType="R.24">$ 500</FormText>
      </StyledCardItem>
    </Card>
  )
}

export default CardOne
