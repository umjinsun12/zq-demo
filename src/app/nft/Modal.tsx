"use client";
import React, { ReactNode, MouseEvent, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import { FormImg } from '@/components/server';
import { FormButton } from '@/components/client';
import { useWallet } from '@suiet/wallet-kit';
import { JsonRpcProvider, TransactionBlock, testnetConnection } from '@mysten/sui.js';
import { contractAddress, contractMethod, contractModule, usdcCoinType, usdcPoolAddress } from '@/consts/pool';

interface ModalProps {
    onClose: () => void;
    onSuccessModalOpen: ()=> void;
    children: ReactNode;
    title?: string;
}

const Modal = ({ onClose, onSuccessModalOpen, children, title }: ModalProps): JSX.Element => {
    const wallet = useWallet();
    const provider = new JsonRpcProvider(testnetConnection);
    
    const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
    };

    const [coinInput, setCoinInput] = useState(0);
    const [estimatedZQValue, setEstimatedZQValue] = useState(0);
    const [flatBTCValue, setFlatBTCValue] = useState(0);
    const [futuresBTCShort, setFuturesBTCShort] = useState(0);
    const [reserveForFundingFee, setReserveForFundingFee] = useState(0);
    const [availableValue, setAvailableValue] = useState(0);
    const [total, setTotal] = useState(0);

    async function getUSDC() {
  
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
            alert('executeMoveCall failed (see response in the console)');
          }
    }


    async function handleExecuteMoveCall(inputAmount:number) {
    
        try {
        const tx = new TransactionBlock();
        
        const address = wallet.account?.address as string;
        const input = {
          owner : address,
          coinType : usdcCoinType,
        }
        const { data: coins } = await provider.getCoins(input);

        console.log(coins);
        let amount:number = inputAmount * Math.pow(10, 9);
    
    
      
        tx.moveCall({
          target: `${contractAddress}::${contractModule}::${contractMethod}` as any,
          arguments: [
            tx.object(coins[0].coinObjectId),
            tx.object(usdcPoolAddress),
            tx.pure(amount),
            tx.pure('zqualizer_nft'),
            tx.pure('zqualizer_nft'),
          ],
          typeArguments: [
            usdcCoinType,
          ],
        });
        const resData = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log('executeMoveCall success', resData);
        onSuccessModalOpen();
        }catch(e) {
          console.error('executeMoveCall failed', e);
          alert('executeMoveCall failed (see response in the console)');
        }
        onClose();
        
    }
      


    // 입력이 변경될 때마다 실행되는 함수
    const handleCoinInputChange = (event:any) => {
        setCoinInput(Number(event.target.value));
    };

    function formatCurrency(value:any) {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    }

    useEffect(() => {
        // 계산 공식
        const zqValue = coinInput * 0.9995; // 이것은 예시입니다. 실제 계산식을 적용해주세요.
        const fundingFee = zqValue * 0.05;
        const btcValue = (zqValue-fundingFee) / 2;
        const btcShort = (zqValue-fundingFee) / 2;
        const totalValue = zqValue;
    
        setEstimatedZQValue(parseFloat(zqValue.toFixed(2)));
        setFlatBTCValue(parseFloat(btcValue.toFixed(2)));
        setFuturesBTCShort(parseFloat(btcShort.toFixed(2)));
        setReserveForFundingFee(parseFloat(fundingFee.toFixed(2)));
        setTotal(parseFloat(totalValue.toFixed(2)));

        getUSDC();
      }, [coinInput]); // coinInput이 변경될 때마다 실행합니다.


    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className='modal-title'>Mint Zquilibrium</div>
                    <div className="modal-body">
                        <div className="modal-input">
                            <div className="coin-info">
                                <div className="coin-select">
                                    <FormImg src="/usd-coin-usdc-logo.png" size={30} />
                                    <span>USDC</span>
                                </div>
                                <div className="right-section">
                                <div className="input-wrapper">
                                <input 
                                    className="coin-input" 
                                    value={coinInput} 
                                    onChange={handleCoinInputChange} 
                                    placeholder="0.0" 
                                />
                                <span>USDC</span>
                                </div>
                                <div className="estimated-value">
                                    Available : {formatCurrency(availableValue)} USDC
                                </div>
                                </div>
                            </div>
                            <div className="asset-value">
                                Your Estimated Zquilibrium Value : {formatCurrency(estimatedZQValue)}
                            </div>
                        </div>

                        <div className='down-img'>
                         <FormImg src="/ic-arrow-double-down.png" size={30} />
                        </div>
                            <div className="zq-wrapper">
                            <div className="zq-title">Your Zquilibrium Value</div>
                            <div className="zq-item">
                                <div className="zq-name">Your Flat BTC Value</div>
                                <div className="zq-value">{formatCurrency(flatBTCValue)}</div>
                            </div>
                            <div className="zq-item">
                                <div className="zq-name">Your Futures BTC Short</div>
                                <div className="zq-value">{formatCurrency(futuresBTCShort)}</div>
                            </div>
                            <div className="zq-item">
                                <div className="zq-name">Reserve for Funding Fee</div>
                                <div className="zq-value">{formatCurrency(reserveForFundingFee)}</div>
                            </div>
                            <div className="zq-total">
                                <div className="zq-total-text">Total</div>
                                <div className="zq-total-value">{formatCurrency(total)}</div>
                            </div>
                            </div>
                            <div className='mint-btn-wrapper'>
                                <FormButton onClick={() => handleExecuteMoveCall(total)} size={'md'} style={{
                                    width: '436px',
                                }}  > Confirm Minting </FormButton>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
    );
};

export default Modal;