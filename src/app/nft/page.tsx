"use client";
import { ReactElement, useState } from 'react'

import { Row, View } from '@/components/server'
import Mint from './Mint'
import MintInfo from './MintInfo'
import ChartOne from './ChartOne'
import { usdcPoolAddress } from '@/consts/pool'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js'

const NFT = (): ReactElement => {
  const provider = new JsonRpcProvider(testnetConnection);
  const [poolValue, setPoolValue] = useState(0);
  
  
  async function getPoolValue(){
    try{
      const input = {
        id : usdcPoolAddress,
        options : {"showContent":true}
      }
  
      let poolData : any = await provider.getObject(input);

      setPoolValue(parseInt(poolData.data.content.fields.balance) / Math.pow(10, 9));

    }catch(e){
      console.error('executeMoveCall failed', e);
    }
  }

  getPoolValue();


  return (
    <View>
      <Row className="gap-5 pb-28">
        <View className="flex-1">
          <Mint />
        </View>
        <View className="flex-1">
          <MintInfo />
        </View>
      </Row>
      <Row className="gap-5">
        <ChartOne text="Total Zquilibrium Minted" value={27394 + poolValue} />
        <ChartOne text="Total Value Locked" value={29380 + poolValue}/>
      </Row>
    </View>
  )
}

export default NFT
