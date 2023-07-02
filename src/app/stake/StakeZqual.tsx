"use client";
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'

import {
  Card,
  FormInput,
  FormText,
  Row,
  View,
  FormLabel,
  FormImg,
} from '@/components/server'
import { FormButton } from '@/components/client'
import { COLOR } from '@/consts'
import { useWallet } from '@suiet/wallet-kit';
import { contractAddress, contractMethod, contractModule, zqPoolAddress, zqualCoinType } from '@/consts/pool';
import { JsonRpcProvider, TransactionBlock, testnetConnection } from '@mysten/sui.js';
import SuccessModal from '../nft/SuccessModal';

const StakeZqual = (): ReactElement => {
  const wallet = useWallet();
  const provider = new JsonRpcProvider(testnetConnection);

  const [zqualAmount, setZqualAmount] = useState<number>(0);
  const [xzqualAmount, setXzqual2Amount] = useState<number>(0);
  const [xzqualValue, setXzqualValue] = useState<number>(0);
  const [zqualValue, setZqualValue] = useState<number>(0);
  const [rewards, setRewards] = useState<number>(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setXzqualValue(zqualAmount * 1.0317);
  }, [zqualAmount]);

  async function handleExecuteMoveCall(inputAmount:number) {
    
    try {
    const tx = new TransactionBlock();
    
    const address = wallet.account?.address as string;
    const input = {
      owner : address,
      coinType : zqualCoinType,
    }
    const { data: coins } = await provider.getCoins(input);
    let amount:number = inputAmount * Math.pow(10, 9);


  
    tx.moveCall({
      target: `${contractAddress}::${contractModule}::${contractMethod}` as any,
      arguments: [
        tx.object(coins[0].coinObjectId),
        tx.object(zqPoolAddress),
        tx.pure(amount),
        tx.pure('zqualizer_xzqual'),
        tx.pure('zqualizer_xzqual'),
      ],
      typeArguments: [
        zqualCoinType,
      ],
    });
    const resData = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
    console.log('executeMoveCall success', resData);
    setShowSuccessModal(true);
    }catch(e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
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
      let totalStake = 0;
      let zqcnt = 0;
      for(let i = 0; i < coins.length; i++) {
        let objectDetail = await getObjectDetail(coins[i].data.objectId);

        console.log(objectDetail);
        if(objectDetail.name == "zqualizer_xzqual"){
          totalStake += parseInt(objectDetail.stake_amount)/1000000000;
          zqcnt += 1;
        }
      }
      setZqualValue(totalStake);

      if(zqcnt > 0){
        setRewards(36.75);
      }

      console.log(totalStake);
  
    
    }catch(e) {
      console.error('executeMoveCall failed', e);
    }
  }

  useEffect(() => {
    getUserValueExecuteMoveCall();
  }, [wallet]);



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(zqualAmount);
    setZqualAmount(Number(event.target.value));
  };


  return (
    <View className="gap-14">
      <Row className="gap-5">
        <Card className="gap-5">
          <FormText>Stake ZQUAL</FormText>
          <View>
            <FormInput value={zqualAmount} onChange={handleChange}  label="Amount" />
          </View>
          <View>
            <FormLabel title="Estimate APR : 3.17%" />
            <Row className="items-center justify-end gap-3">
              <FormText fontType="R.14" color={COLOR.core._200}>
                You will receive
              </FormText>
              <FormText>{xzqualValue.toFixed(2)} xZQUAL</FormText>
            </Row>
          </View>
          <FormButton onClick={()=>handleExecuteMoveCall(zqualAmount)}>Stake</FormButton>
        </Card>
        <Card className="gap-5">
          <FormText>Unstake ZQUAL</FormText>
          <View>
            <FormInput value={xzqualAmount} label="Amount" />
          </View>
          <View>
            <FormLabel title="Available Zqual : 0" />
            <Row className="items-center justify-end gap-3">
              <FormText fontType="R.14" color={COLOR.core._200}>
                You will receive
              </FormText>
              <FormText>0.00 ZQUAL</FormText>
            </Row>
          </View>
          <FormButton>UnStake</FormButton>
        </Card>
      </Row>
      <Row className="gap-5">
        <Card
          style={{
            backgroundColor: COLOR.core._800,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
          }}
        >
          <Row className="gap-5">
            <FormImg src="/icons/logo-zqual.svg" size={40} />
            <View className="gap-2">
              <FormText fontType="R.14">Available Rewards</FormText>
              <FormText>{rewards} ZQUAL</FormText>
            </View>
          </Row>
          <View className="w-20">
            <FormButton size="sm">Claim</FormButton>
          </View>
        </Card>
        <Card
          style={{
            backgroundColor: COLOR.core._800,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
          }}
        >
          <Row className="gap-5">
            <FormImg src="/icons/logo-xzqual.svg" size={40} />
            <View className="gap-2">
              <FormText fontType="R.14">Your xZQUAL</FormText>
              <FormText>{zqualValue}</FormText>
            </View>
          </Row>
          <FormText>Locked for 120 Days</FormText>
        </Card>
      </Row>
      {showSuccessModal &&
        <SuccessModal onClose={() =>setShowSuccessModal(false)} title='Stake' description='Your ZQUAL Token has been staked successfully. Check and refresh webpage as it might not appear immediately.'>
            Hello from the modal!
        </SuccessModal>
      }
    </View>
  )
}

export default StakeZqual
