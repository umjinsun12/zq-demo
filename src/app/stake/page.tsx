"use client";
import { ReactElement, useEffect } from 'react'

import { View } from '@/components/server'
import StakeSummary from './StakeSummary'
import StakeZqual from './StakeZqual'
import { useWallet } from '@suiet/wallet-kit'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js'
import { zqPoolAddress } from '@/consts/pool';

const Stake = (): ReactElement => {
  const wallet = useWallet();
  const provider = new JsonRpcProvider(testnetConnection);
  
  async function getObjectDetail(objId:any) {
    try {
  
      const input = {
        id : objId,
        options : {"showContent":true}
      }
  
      let {data: coins} : any = await provider.getObject(input);
      console.log(coins);
      return coins?.content.fields;
    }catch(e) {
      console.error('executeMoveCall failed', e);
    }
  }

  useEffect(() => {
    getObjectDetail(zqPoolAddress);
    
}, [wallet]);

  return (
    <View className="gap-5">
      <StakeSummary />
      <StakeZqual />
    </View>
  )
}

export default Stake
