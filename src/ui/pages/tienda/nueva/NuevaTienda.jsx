import React from 'react'
import { Navigate } from 'react-router-dom'

import { TextInput } from '../../../components'

import { API_TIENDA } from '../../../../data/api'

import styles from './NuevaTienda.module.css'

const NuevaTienda = () => {
    const [codigo, setCodigo] = React.useState('');
    const [codigoError, setCodigoError] = React.useState(false);
    const [direccion, setDireccion] = React.useState('');
    const [ciudad, setCiudad] = React.useState('');
    const [provincia, setProvincia] = React.useState('');

    const guardarOnClick = () => {
        const tienda = {
            codigo,
            direccion,
            ciudad,
            provincia
        }

        fetch(API_TIENDA.ALTA, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tienda),
        })
            .then(response => response.json())
            .then(response => {
                if (response.estado) {
                    setFinalizado(true);
                } else {
                    setCodigoError(true);
                }
            })
    };

    React.useEffect(() => {
        setCodigoError(false);
    }, [codigo]);

    const [finalizado, setFinalizado] = React.useState(false);

    return (
        <div>
            {finalizado && <Navigate to={"/tiendas"} />}
            <div className={styles.encabezado}>
                <h1>Nueva Tienda</h1>
            </div>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Código de Tienda"}
                        helperText={"Código alfanumérico"}
                        onChange={setCodigo}
                        alfanumerico={true}
                        error={codigoError}
                        feedback={codigoError && 'El código ingresado ya esta en uso'}
                    />
                    <TextInput
                        label={"Dirección"}
                        onChange={(value) => setDireccion(value)}
                    />
                    <TextInput
                        label={"Ciudad"}
                        onChange={(value) => setCiudad(value)}
                    />
                    <TextInput
                        label={"Provincia"}
                        onChange={(value) => setProvincia(value)}
                    />
                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NuevaTienda