"use client";
import { ReactElement, useState } from 'react'

import { FormImg, View } from '@/components/server'
import { FormButton } from '@/components/client'
import Modal from './Modal';
import SuccessModal from './SuccessModal';

const Mint = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <View className="w-[630] self-center gap-5">
      <FormImg src="/zquilibrium.png" size={430} />
      <FormButton onClick={() => setShowModal(true)}>Mint Zquilibrium</FormButton>
      {showModal &&
            <Modal onClose={() => setShowModal(false)} onSuccessModalOpen={() => setShowSuccessModal(true)}>
                Hello from the modal!
            </Modal>
      }
      {showSuccessModal &&
        <SuccessModal onClose={() =>setShowSuccessModal(false)} title='Mint' description='Your NFT has been minted successfully. Check and refresh your wallet as it might not appear immediately.'>
            Hello from the modal!
        </SuccessModal>
      }
    </View>
  )
}

export default Mint
