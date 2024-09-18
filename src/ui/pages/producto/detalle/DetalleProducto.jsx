import React from 'react'

import styles from './DetalleProducto.module.css'

import { useParams } from 'react-router-dom'

import { TextInput } from '../../../components'

import { API_PRODUCTO } from '../../../../data/api'
//import { API_AUTH } from '../../../../data/api';
//import { useSelector } from 'react-redux';

const DetalleProducto = () => {
    //const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];
    const detallesVisualizacion = useParams();
    const codigo = detallesVisualizacion.id;
    const [idProducto, setIdProducto] = React.useState();
    const [nombre, setNombre] = React.useState('');
    const [talle, setTalle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [imagen, setImagen] = React.useState('');
    const [estado, setEstado] = React.useState();

    React.useEffect(() => {
        fetch(API_PRODUCTO.OBTENER, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo
            }),
        })
            .then(response => response.json())
            .then(response => {
                setIdProducto(response.idProducto);
                setNombre(response.nombre);
                setTalle(response.talle);
                setColor(response.color);
                setImagen(response.imagen);
                setEstado(response.habilitado);
            })
    }, []);

    // ACCIONES
    const guardarOnClick = () => {
        fetch(API_PRODUCTO.MODIFICAR, {
            method: 'PUT', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProducto, codigo, nombre, talle, color, imagen, habilitado: estado }),
        })
            .then(response => response.json())
            .then(response => {
                alert('Cambios guardados')
            })
    };

    return (
        <div>
            <h1>
                <span>{codigo}</span>
            </h1>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Nombre"}
                        value={nombre}
                        onChange={(value) => setNombre(value)}
                    />
                    <TextInput
                        label={"Talle"}
                        value={talle}
                        onChange={(value) => setTalle(value)}
                    />
                    <TextInput
                        label={"Color"}
                        value={color}
                        onChange={(value) => setColor(value)}
                    />
                    <TextInput
                        label={"Imagen"}
                        value={imagen}
                        onChange={(value) => setImagen(value)}
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

export default DetalleProducto