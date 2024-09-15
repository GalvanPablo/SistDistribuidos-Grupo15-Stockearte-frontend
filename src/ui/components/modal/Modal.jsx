import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.css'

const Modal = ({ btnAction, title, children, width  }) => {
    const [modal, setModal] = React.useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                {btnAction}
            </button>
            {modal && (
                <div className={styles.modal}>
                    <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.modal__content}>
                        <div className={styles.modal__header}>
                            <span>{title}</span>
                            <div title='Cerrar' onClick={toggleModal}><FontAwesomeIcon icon={faXmark} /></div>
                        </div>
                        <div className={styles.modal__body} style={{ width: width }}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal