"use client";
import { ReactElement, useEffect, useState } from 'react'

import { Row, View } from '@/components/server'
import MySummary from './MySummary'
import CardOne from './CardOne'
import CardTwo from './CardTwo'
import ChartOne from './ChartOne'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js'
import { usdcPoolAddress, zqPoolAddress } from '@/consts/pool'

const Home = (): ReactElement => {

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
      <MySummary />
      <Row className="gap-8">
        <View className="gap-5 flex-1">
          <CardOne />
          <CardTwo />
        </View>
        <View className="gap-5 flex-1">
          <ChartOne text='Total Value Locked' value={29380 + usdcPoolValue + 24736 + poolValue} />
          <ChartOne text='Total Minted Zquilibrium' value={127} />
          <ChartOne text='Total Locked USDC' value={29380 + usdcPoolValue}/>
        </View>
      </Row>
    </View>
  )
}

export default Home
