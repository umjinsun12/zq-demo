'use client'

import { ReactElement, useEffect, useState } from 'react'

import { Card, FormText, Row, View } from '@/components/server'
import styled from 'styled-components'
import { COLOR } from '@/consts'
import { usdcCoinType, usdcPoolAddress } from '@/consts/pool'
import { useWallet } from '@suiet/wallet-kit'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js'
import { set } from 'lodash'

const StyledCardItem = styled(View)`
  flex: 1;
  border-radius: 20px;
  background-color: ${COLOR.core._800};
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  border: 2px solid #373742;
  gap: 12px;
`


const MintInfo = (): ReactElement => {
  const wallet = useWallet();
  const provider = new JsonRpcProvider(testnetConnection);
  const [zqValue, setZqValue] = useState(0);
  const [availableValue, setAvailableValue] = useState(0);
  const [poolValue, setPoolValue] = useState(0);

  function formatCurrency(value:any) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
  }

  async function getUserUSDC() {
  
    try {
      const address = wallet.account?.address as string;
      const input = {
        owner : address,
        coinType : usdcCoinType,
      }
      const { data: coins } = await provider.getCoins(input);

      setAvailableValue(parseInt(coins[0].balance) / Math.pow(10, 9));

      console.log(coins);
    }catch(e) {
        console.error('executeMoveCall failed', e);
      }
  }

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
      console.log(coins.length);
      let totalStake = 0;
      for(let i = 0; i < coins.length; i++) {
        let objectDetail = await getObjectDetail(coins[i].data.objectId);
        console.log(objectDetail);
        if(objectDetail.name == "zqualizer_nft"){
          totalStake += parseInt(objectDetail.stake_amount)/1000000000;
        }
      }

      setZqValue(totalStake);

      console.log(totalStake);
  
    
    }catch(e) {
      console.error('executeMoveCall failed', e);
    }
  }


  
  useEffect(() => {
      getObjectDetail(usdcPoolAddress);
      getUserValueExecuteMoveCall();
      getUserUSDC();
      getPoolValue();
  }, [wallet]);
  
  return (
    <View>
      <View className="gap-3 pb-8">
        <FormText fontType="B.24">Mint Zquilibrium :</FormText>
        <FormText fontType="R.14">
          Zquilibrium owners will be eligible to receive rewards in both USDT
          and ZQUAL
        </FormText>
      </View>
      <Card className="gap-3">
        <Row className="gap-3">
          <StyledCardItem>
            <FormText fontType="B.14">Available Balance</FormText>
            <FormText fontType="B.20">$ {formatCurrency(availableValue)}</FormText>
          </StyledCardItem>
          <StyledCardItem>
            <FormText fontType="B.14">My Zquilibrium Value</FormText>
            <FormText fontType="B.20">$ {formatCurrency(zqValue)}</FormText>
          </StyledCardItem>
        </Row>
        <Row className="gap-3">
          <StyledCardItem>
            <FormText fontType="B.14">Zquilibrium APR</FormText>
            <FormText fontType="B.20">12.81%</FormText>
          </StyledCardItem>
          <StyledCardItem>
            <FormText fontType="B.14">My Zquilibrium Rewards</FormText>
            <FormText fontType="B.20">$ 0</FormText>
          </StyledCardItem>
        </Row>
      </Card>
    </View>
  )
}

export default MintInfo
