import './globals.css'
import { Montserrat } from 'next/font/google'
import { ReactElement } from 'react'

import Header from './Header'
import { Row, View } from '@/components/server'
import LeftMenu from './LeftMenu'
import AppProvider from './AppProvider'
import "@suiet/wallet-kit/style.css";
import "./suiet-wallet-kit-custom.css";

const font = Montserrat({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Zqualizer',
  description: 'Zqualizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <html lang="en">
      <body className={font.className}>
        <AppProvider>
          <View className="gap-5">
            
            <Header />
            <Row className="gap-5">
              <LeftMenu />
              <View className="flex-1">
                <View className="w-[1280px]">{children}</View>
              </View>
            </Row>
          </View>
        </AppProvider>
        <div id="modal-root"></div>
        <div id="success-modal-root"></div>
      </body>
    </html>
  )
}
