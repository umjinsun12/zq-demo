"use client";
import { ReactElement, useState } from 'react'

import { FormImg, View } from '@/components/server'
import { FormButton } from '@/components/client'
import Modal from './Modal';

const Mint = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="w-[630] self-center gap-5">
      <FormImg src="/zquilibrium.png" size={430} />
      <FormButton onClick={() => setShowModal(true)}>Mint Zquilibrium</FormButton>
      {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                Hello from the modal!
            </Modal>
        }
    </View>
  )
}

export default Mint
