import React from 'react'
import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

import avatarDefault from './../../../assets/img/avatar.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux';

const NavBar = () => {
    const nombre = useSelector(state => state.auth.nombre);

    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/" className={styles.brand__link}>
                    <span>Stockearte</span>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                </Link>
            </div>
            <div className={styles.user}>
                <span className={styles.user__name}>{nombre?nombre:'Usuario'}</span>
                <div className={styles.user__image}>
                    <img src={avatarDefault} alt="avatar usuario" />
                </div>
            </div>
        </header>
    )
}

export default NavBar