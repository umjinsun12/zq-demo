"use client";
import React, { ReactNode, MouseEvent, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import { FormImg } from '@/components/server';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
}

const SuccessModal = ({ onClose, children, title, description }: ModalProps): JSX.Element => {

    const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
    };


    const modalContent = (
        <div className="modal-overlay">
            <div className="success-modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className='modal-title'>
                        <div className='title-content'>
                            <FormImg src="/ic-success.png" size={40} />
                            <span>{title} Success</span>
                        </div>
                    </div>
                    <div className="description">
                            {description}
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("success-modal-root")!
    );

};

export default SuccessModal;