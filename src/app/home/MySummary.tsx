"use client";
import { ReactElement, useEffect, useState } from 'react'

import { FormImg, FormText, Row, View } from '@/components/server'
import { useWallet } from '@suiet/wallet-kit';
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js';
import { set } from 'lodash';

const MySummary = (): ReactElement => {
  
  const wallet = useWallet();
  const provider = new JsonRpcProvider(testnetConnection);

  const [rewards, setRewards] = useState<number>(0);
  const [totalStake, setTotalStake] = useState<number>(0);
  const [zqualValue, setZqualValue] = useState<number>(0);

  async function getObjectDetail(objId:any) {
    try {
  
      const input = {
        id : objId,
        options : {"showContent":true}
      }
  
      let {data: coins} : any = await provider.getObject(input);
      return coins?.content.fields;
    }catch(e) {
      console.error('executeMoveCall failed', e);
    }
  }


  async function getUserValueExecuteMoveCall() {
    try {
    
      const address = wallet.account?.address as string;
      const input = {
        owner : address,
      }
  
      let {data: coins} : any = await provider.getOwnedObjects(input);
      let totalStake = 0;
      let totalZqual = 0;
      let totalNft = 0 ;
      let zqcnt = 0;
      for(let i = 0; i < coins.length; i++) {
        let objectDetail = await getObjectDetail(coins[i].data.objectId);

        console.log(objectDetail);
        if(objectDetail.name == "zqualizer_xzqual"){
          totalStake += parseInt(objectDetail.stake_amount)/1000000000;
          totalZqual += parseInt(objectDetail.stake_amount)/1000000000;
          zqcnt += 1;
        }else if(objectDetail.name == "zqualizer_nft"){
          totalStake += parseInt(objectDetail.stake_amount)/1000000000;
        }
      }
      setZqualValue(totalZqual);
      setTotalStake(totalStake);

      if(zqcnt > 0){
        setRewards(100);
      }

      console.log(totalStake);
  
    
    }catch(e) {
      console.error('executeMoveCall failed', e);
    }
  }

  function formatCurrency(value:any) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
  }

  useEffect(() => {
    getUserValueExecuteMoveCall();
  }, [wallet]);


  return (
    <Row className="p-5 gap-4 justify-between">
      <Row className="gap-5">
        <FormImg src="/icons/ic-mybalance.svg" size={40} />
        <View className="gap-2">
          <FormText fontType="R.12">My total balance</FormText>
          <FormText fontType="R.16">$ {formatCurrency(totalStake)}</FormText>
        </View>
      </Row>
      <Row className="gap-5">
        <FormImg src="/icons/ic-myvalue.svg" size={40} />
        <View className="gap-2">
          <FormText fontType="R.12">My Zquilibrium Value</FormText>
          <FormText fontType="R.16">$ {formatCurrency(zqualValue)}</FormText>
        </View>
      </Row>
      <Row className="gap-5">
        <FormImg src="/icons/logo-zqual.svg" size={40} />
        <View className="gap-2">
          <FormText fontType="R.12">My rewards</FormText>
          <FormText fontType="R.16">$ {formatCurrency(rewards)}</FormText>{' '}
        </View>
      </Row>
      <Row className="gap-5">
        <FormImg src="/usd-coin-usdc-logo.png" size={48} />
        <View className="gap-2">
          <FormText fontType="R.12">My rewards</FormText>
          <FormText fontType="R.16">$ 0</FormText>
        </View>
      </Row>
    </Row>
  )
}

export default MySummary
