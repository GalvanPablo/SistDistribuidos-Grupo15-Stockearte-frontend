import React from 'react'

// Manejo de Datos globales
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom'
import styles from "./SideBar.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faTags, faUser, faFireFlameCurved, faTruckFast, faBookOpen, faFileLines } from '@fortawesome/free-solid-svg-icons'

import { API_AUTH } from '../../../data/api';

const SideBar = () => {
    const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.navList}>
                {deCentral && (

                    <li className={styles.navListItem}>
                        <NavLink
                            to="/tiendas"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navListItemLink} ${styles.active}`
                                    : styles.navListItemLink
                            }
                        >
                            <FontAwesomeIcon icon={faShop} />
                            <span>Tiendas</span>
                        </NavLink>
                    </li>
                )}
                <li className={styles.navListItem}>
                    <NavLink
                        to="/productos"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.navListItemLink} ${styles.active}`
                                : styles.navListItemLink
                        }
                    >
                        <FontAwesomeIcon icon={faTags} />
                        <span>Productos</span>
                    </NavLink>
                </li>
                {deCentral && (
                    <>
                        <li className={styles.navListItem}>
                            <NavLink
                                to="/usuarios"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navListItemLink} ${styles.active}`
                                        : styles.navListItemLink
                                }
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span>Usuarios</span>
                            </NavLink>
                        </li>
                        <li className={styles.navListItem}>
                            <NavLink
                                to="/novedades"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navListItemLink} ${styles.active}`
                                        : styles.navListItemLink
                                }
                            >
                                <FontAwesomeIcon icon={faFireFlameCurved} />
                                <span>Novedades</span>
                            </NavLink>
                        </li>
                    </>
                )}

                {!deCentral && (
                    <>
                        <li className={styles.navListItem}>
                            <NavLink
                                to="/ordenesDeCompra"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navListItemLink} ${styles.active}`
                                        : styles.navListItemLink
                                }
                            >
                                <FontAwesomeIcon icon={faTruckFast} />
                                <span>Ordenes De Compra</span>
                            </NavLink>
                        </li>
                        <li className={styles.navListItem}>
                            <NavLink
                                to="/catalogo"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navListItemLink} ${styles.active}`
                                        : styles.navListItemLink
                                }
                            >
                                <FontAwesomeIcon icon={faBookOpen} />
                                <span>Catalogos</span>
                            </NavLink>
                        </li>
                    </>
                )}
                <li className={styles.navListItem}>
                    <NavLink
                        to="/informes"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.navListItemLink} ${styles.active}`
                                : styles.navListItemLink
                        }
                    >
                        <FontAwesomeIcon icon={faFileLines} />
                        <span>Informes</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SideBar