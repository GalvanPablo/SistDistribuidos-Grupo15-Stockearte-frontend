import React from 'react'
import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

import avatarDefault from './../../../assets/img/avatar.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth.action'

const NavBar = () => {
    const dispatch = useDispatch();
    const nombre = useSelector(state => state.auth.nombre);
    const [menuVisible, setMenuVisible] = React.useState(false);

    const handleAvatarClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleCerrarSesion = () => {
        dispatch(logout());
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/" className={styles.brand__link}>
                    <span>Stockearte</span>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                </Link>
            </div>
            <div className={styles.user}>
                <span className={styles.user__name}>{nombre ? nombre : 'Usuario'}</span>
                <div className={styles.user__image} onClick={handleAvatarClick}>
                    <img src={avatarDefault} alt="avatar usuario" />
                    {menuVisible && (
                        <div className={styles.menu}>
                            <ul>
                                <li>
                                    <Link to="/" onClick={handleCerrarSesion}>
                                        Cerrar sesión
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default NavBar