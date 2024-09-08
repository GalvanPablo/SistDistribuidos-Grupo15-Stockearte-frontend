import React from 'react'

import { NavLink } from 'react-router-dom'
import styles from "./SideBar.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faTags, faUser } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.navList}>
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
            </ul>
        </nav>
    )
}

export default SideBar