import React from "react";

import { TextInput } from '../../../components'

import { API_USUARIO } from '../../../../data/api'

import styles from './NuevoUsuario.module.css'

const NuevoUsuario = () => {
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [clave, setClave] = React.useState('');

    const guardarOnClick = () => {
        const usuario = {
            nombre,
            email,
            clave
        }

        fetch(API_USUARIO.ALTA, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario),
        })
           .then(response => {
                if (!response.ok) {
                    response.text().then(text => {
                        alert(`ERROR: ${response.status}\n${text}`);
                        setEmailError(true);
                    });
                } else {
                    response.json();
                    alert('TODO JOYA');
                }
            })
    };

    React.useEffect(()=>{
        setEmailError(false);
    }, [email]);

    return (
        <div>
            <div className={styles.encabezado}>
                <h1>Nuevo Usuario</h1>
            </div>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Nombre"}
                        onChange={(value) => setNombre(value)}
                    />
                    <TextInput
                        label={"Email"}
                        onChange={setEmail}
                        error={emailError}
                        feedback={emailError && 'El email ingresado ya esta en uso'}
                    />
                    <TextInput
                        label={"Contraseña"}
                        onChange={(value) => setClave(value)}
                    />
                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NuevoUsuario