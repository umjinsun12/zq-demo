"use client";
import { ReactElement } from 'react'

import { FormImg, Row, View } from '@/components/server'
import { ConnectButton, addressEllipsis, useWallet } from '@suiet/wallet-kit'

const Header = (): ReactElement => {
  const wallet = useWallet();
  
  return (
    <Row className="justify-between p-7 max-w-[1800px]">
      <View>
        <FormImg src="/logo.png" size={150} />
      </View>
      <View>


      {wallet?.account ? (
        <div
          data-te-chip-init
          data-te-ripple-init
          className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200">
          <img
            className="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[100%]"
            src="https://s1.coincarp.com/logo/1/sui.png"
            alt="Contact Person" />
          {addressEllipsis(wallet?.account.address)}
        </div> 
      ): (
        <ConnectButton className="wkit-button">
          Connect Wallet
        </ConnectButton>
      )}

        

        {/* */}

      </View>
    </Row>
  )
}

export default Header
