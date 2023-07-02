import { ReactElement, useEffect, useState } from 'react'

import { FormImg, FormText, Row, View } from '@/components/server'
import { usdcPoolAddress, zqPoolAddress } from '@/consts/pool';
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js';

const StakeSummary = (): ReactElement => {

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
    <View className="gap-5">
      <FormText fontType="B.24">ZQUALIZER Staking Analytics</FormText>
      <Row className="p-5 gap-4 justify-between">
        <Row className="gap-5">
          <FormImg src="/icons/ic-stake-apr.svg" size={40} />
          <View className="gap-2">
            <FormText fontType="R.12">ZQUAL Staking APR</FormText>
            <FormText fontType="R.16">3.17%</FormText>
          </View>
        </Row>
        <Row className="gap-5">
          <FormImg src="/icons/ic-stake-total.svg" size={40} />
          <View className="gap-2">
            <FormText fontType="R.12">Total ZQUAL Staked</FormText>
            <FormText fontType="R.16">$ {formatCurrency(24736 + poolValue)}</FormText>
          </View>
        </Row>
        <Row className="gap-5">
          <FormImg src="/icons/ic-stake-ratio.svg" size={40} />
          <View className="gap-2">
            <FormText fontType="R.12">Staked Ratio</FormText>
            <FormText fontType="R.16">17.63%</FormText>{' '}
          </View>
        </Row>
        <Row className="gap-5">
          <FormImg src="/icons/ic-stake-locked.svg" size={40} />
          <View className="gap-2">
            <FormText fontType="R.12">Total Value Locked</FormText>
            <FormText fontType="R.16">$ {formatCurrency(29380 + usdcPoolValue)}</FormText>
          </View>
        </Row>
      </Row>
    </View>
  )
}

export default StakeSummary
