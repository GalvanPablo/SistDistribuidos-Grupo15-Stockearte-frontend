import React from 'react';
import { Navigate } from 'react-router-dom'
import { TextInput } from '../../../components'
import { API_USUARIO, API_AUTH } from '../../../../data/api'
import styles from './NuevoUsuario.module.css'

const NuevoUsuario = () => {
    const [nombre, setNombre] = React.useState('');
    const [errorNombre, setErrorNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [clave, setClave] = React.useState('');
    const [errorClave, setErrorClave] = React.useState('');
    const [rol, setRol] = React.useState(API_AUTH.ROLES[0]);

    const guardarOnClick = () => {
        let sinErrores = true;
        if (nombre.trim().length === 0) {
            setErrorNombre('El nombre es obligatorio');
            sinErrores = false;
        } else {
            setErrorNombre('');
        }

        if (nombre.trim().length === 0) {
            setErrorEmail('El mail es obligatorio');
            sinErrores = false;
        } else {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) {
                setErrorEmail('Formato de mail invalido');
                sinErrores = false;
            } else {
                setErrorEmail('');
            }
        }

        if (clave.trim().length === 0) {
            setErrorClave('La contraseña es obligatoria');
            sinErrores = false;
        } else {
            setErrorClave('');
        }


        if (!sinErrores) {
            return;
        }

        const usuario = {
            nombre,
            email,
            clave,
            rol
        }

        console.table(usuario);

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
                        setErrorEmail('El email ingresado ya esta en uso');
                    });
                } else {
                    response.json();
                    setFinalizado(true)
                }
            })
    };

    const [finalizado, setFinalizado] = React.useState(false);

    return (
        <div>
            {finalizado && <Navigate to={"/usuarios"} />}
            <div className={styles.encabezado}>
                <h1>Nuevo Usuario</h1>
            </div>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Nombre"}
                        onChange={(value) => setNombre(value)}
                        error={errorNombre.length !== 0}
                        feedback={errorNombre}
                    />
                    <TextInput
                        label={"Email"}
                        onChange={setEmail}
                        error={errorEmail.length !== 0}
                        feedback={errorEmail}
                    />
                    <TextInput
                        label={"Contraseña"}
                        onChange={(value) => setClave(value)}
                        error={errorClave.length !== 0}
                        feedback={errorClave}
                    />
                    <div className={styles.input_rol}>
                        <label htmlFor="rol">Tipo de Usuario</label>
                        <select name="rol" id="rol" onChange={(e) => setRol(e.target.value)}>
                            <option value={API_AUTH.ROLES[0]}>Sucursal</option>
                            <option value={API_AUTH.ROLES[1]}>Central</option>
                        </select>
                    </div>

                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NuevoUsuario