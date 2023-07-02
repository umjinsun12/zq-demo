'use client'
import { ReactElement, ReactNode } from 'react'
import { Chart, registerables } from 'chart.js'
import {WalletProvider} from "@suiet/wallet-kit";
Chart.register(...registerables)

const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return <WalletProvider>{children}</WalletProvider>
}

export default AppProvider
