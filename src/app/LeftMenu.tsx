'use client'

import { ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import _ from 'lodash'
import { IconCaretRight } from '@tabler/icons-react'

import { FormImg, FormText, Row, View } from '@/components/server'
import { RoutesEnum } from '@/types'

const menuList = [
  {
    title: 'Home',
    href: RoutesEnum.HOME,
    icon: '/icons/ic-home.svg',
    iconActive: '/icons/ic-home-active.svg',
  },
  {
    title: 'Zquilibrium',
    href: RoutesEnum.NFT,
    icon: '/icons/ic-zqual.svg',
    iconActive: '/icons/ic-zqual-active.svg',
  },
  {
    title: 'Stake',
    href: RoutesEnum.STAKE,
    icon: '/icons/ic-stake.svg',
    iconActive: '/icons/ic-stake-active.svg',
  },
]

const LeftMenu = (): ReactElement => {
  const pathname = usePathname()

  return (
    <View className="p-5 gap-2 min-w-176">
      {_.map(menuList, (item, index) => {
        const isActive =
          pathname === '/'
            ? item.href === RoutesEnum.HOME
            : pathname.includes(item.href)

        return (
          <View key={`menuList-${index}`}>
            <Link href={item.href}>
              <Row className="items-center gap-3 pl-7 py-3">
                <FormImg
                  src={isActive ? item.iconActive : item.icon}
                  size={16}
                />
                <FormText>{item.title}</FormText>
                {isActive && <IconCaretRight fill="white" size={12} />}
              </Row>
            </Link>
          </View>
        )
      })}
    </View>
  )
}

export default LeftMenu
