import React from 'react'

import { useDispatch } from 'react-redux'
import { login } from './../../../store/actions/auth.action'

import styles from "./Auth.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

const Auth = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [passwd, setPasswd] = React.useState('');

    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <div className={styles.auth__content}>
                    <div className={styles.auth__welcome}>
                        <span>Bienvenido de nuevo a</span>
                        <h1 className={styles.brand}>
                            <span>Stockearte</span>
                            <FontAwesomeIcon icon={faBoxesStacked} />
                        </h1>
                        <p>¡Por favor ingrese sus credenciales para iniciar sesión!</p>
                    </div>
                    <form action='#' className={styles.auth__form}>
                        <div className={styles.auth__field}>
                            <label htmlFor="email" className={styles.auth__label}>Email</label>
                            <input type="email" name="email" id="email" placeholder='Ingresa tu email' required
                                className={styles.auth__input}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.auth__field}>
                            <label htmlFor="passwd" className={styles.auth__label}>Contraseña</label>
                            <input type="password" name="passwd" id="passwd" placeholder='Ingresa tu contraseña' required
                                className={styles.auth__input}
                                onChange={e => setPasswd(e.target.value)}
                            />
                        </div>
                        <button type="submit"
                            className={styles.auth__button}
                            onClick={e => {
                                e.preventDefault();

                                if (email.trim().length === 0) {
                                    alert('El email es requerido');
                                    return;
                                }

                                if (passwd.trim().length === 0) {
                                    alert('La contraseña es requerido');
                                    return;
                                }

                                dispatch(login(email, passwd));
                            }}
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth