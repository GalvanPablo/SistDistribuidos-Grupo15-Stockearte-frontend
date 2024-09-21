import React from 'react'

import styles from './DetalleUsuario.module.css'
import { useParams } from "react-router-dom"

import { TextInput } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { API_USUARIO } from '../../../../data/api';

import { Navigate } from 'react-router-dom'

const DetalleUsuario = () => {
    const detallesVisualizacion = useParams();
    const idUsuario = detallesVisualizacion.id;
    const [nombre, setNombre] = React.useState();
    const [email, setEmail] = React.useState('');
    const [clave, setClave] = React.useState('');
    const [estado, setEstado] = React.useState('');

    const [finalizado, setFinalizado] = React.useState(false);


    React.useEffect(() => {
        fetch(API_USUARIO.OBTENER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUsuario
            }),
        })
            .then(response => response.json())
            .then(response => {
                setNombre(response.nombre);
                setEmail(response.email);
                setClave(response.clave);
                setEstado(response.habilitado);
            })
    }, [idUsuario]);

    // ACCIONES
    const guardarOnClick = () => {
        const modificaciones = { idUsuario, nombre, email, clave, habilitado: estado };

        fetch(API_USUARIO.MODIFICAR, {
            method: 'PUT', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modificaciones),
        })
            .then(response => response.json())
            .then(response => {
                alert('Cambios guardados')
                setFinalizado(true)
            })
    };

    return (
        <div>
            {finalizado && <Navigate to={"/usuarios"} />}
            <h1>
                <FontAwesomeIcon icon={faUser} />
                <span>Detalle del Usuario</span>
            </h1>
              <span>Modificar Usuario</span>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Nombre"}
                        value={nombre}
                        onChange={(value) => setNombre(value)}
                    />
                    <TextInput
                        label={"Email"}
                        value={email}
                        onChange={(value) => setEmail(value)}
                    />
                    <TextInput
                        label={"Clave"}
                        value={clave}
                        onChange={(value) => setClave(value)}
                        passwd={true}
                    />

                    <div className={styles.input_estado}>
                        <label htmlFor="habilitada">Estado</label>
                        <select name="habilitada" id="habilitada"
                            onChange={({ target: { value } }) => setEstado(value === "1")}
                        >
                            <option value="1" selected={estado}>Habilitado</option>
                            <option value="0" selected={!estado}>Deshabilitado</option>
                        </select>
                    </div>

                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                    <button type="button" className={styles.btn_eliminar}>
                        Eliminar
                    </button>
                </form>
            </div>
        </div>

    )
}

export default DetalleUsuario