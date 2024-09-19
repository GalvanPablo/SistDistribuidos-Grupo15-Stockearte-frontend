import React from "react";
import { Navigate } from 'react-router-dom'
import { TextInput } from '../../../components'
import { API_PRODUCTO } from '../../../../data/api'
import styles from './NuevoProducto.module.css'

const NuevoProducto = () => {
    const [nombre, setNombre] = React.useState('');
    const [talle, setTalle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [imagen, setImagen] = React.useState('');

    const guardarOnClick = () => {
        const producto = {
            nombre,
            talle,
            color,
            imagen
        }

        fetch(API_PRODUCTO.ALTA, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto),
        })
            .then(response => {
                if (!response.ok) {
                    response.text().then(text => {
                        alert(`ERROR: ${response.status}\n${text}`);
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
            {finalizado && <Navigate to={"/productos"} />}
            <div className={styles.encabezado}>
                <h1>Nuevo Producto</h1>
            </div>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Nombre"}
                        onChange={(value) => setNombre(value)}
                    />
                    <TextInput
                        label={"Talle"}
                        onChange={(value) => setTalle(value)}
                    />
                    <TextInput
                        label={"Color"}
                        onChange={(value) => setColor(value)}
                    />
                    <TextInput
                        label={"Imagen"}
                        onChange={(value) => setImagen(value)}
                        maxLength={1000}
                    />
                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NuevoProducto