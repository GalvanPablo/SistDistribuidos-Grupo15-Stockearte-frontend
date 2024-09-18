import React from 'react'

import styles from './DetalleUsuario.module.css'

import { useParams } from "react-router-dom"
import { TextInput } from '../../../components'

import { API_USUARIO } from '../../../../data/api';

const DetalleUsuario = () => {
    const detallesVisualizacion = useParams();
    const idUsuario = detallesVisualizacion.id;
    const [nombre, setNombre] = React.useState();
    const [email, setEmail] = React.useState('');
    const [clave, setClave] = React.useState('');
    const [estado, setEstado] = React.useState('');


    React.useEffect(() => {
        fetch(API_USUARIO.OBTENER, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
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
    }, []);

      // ACCIONES
    const guardarOnClick = () => {
        fetch(API_USUARIO.MODIFICAR, {
            method: 'PUT', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idUsuario, nombre, email, clave, habilitado: estado }),
        })
            .then(response => response.json())
            .then(response => {
                alert('Cambios guardados')
            })
    };

    return (
        <div>
          <h1>
            <span>{idUsuario}</span>
          </h1>
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
                    />

                    <div className={styles.input_estado}>
                        <label htmlFor="habilitada">Estado</label>
                        <select name="habilitada" id="habilitada"
                            onChange={({ target: { value } }) => setEstado(value === "1")}
                        >
                            <option value="1" selected={estado}>Habilitada</option>
                            <option value="0" selected={!estado}>Deshabilitada</option>
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

export default DetalleUsuario