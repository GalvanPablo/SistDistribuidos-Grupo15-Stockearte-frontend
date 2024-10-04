import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './ModalGeneric.module.css'
const ModalGeneric = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.modalClose} onClick={onClose} title='Cerrar'>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
};

export default ModalGeneric;