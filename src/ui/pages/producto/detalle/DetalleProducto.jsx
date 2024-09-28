import React from 'react'

import styles from './DetalleProducto.module.css'
import { Navigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'

import { TextInput } from '../../../components'

import { API_PRODUCTO, API_TIENDA } from '../../../../data/api'
import { API_AUTH } from '../../../../data/api';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

const DetalleProducto = () => {
    const deSucursal = useSelector(state => state.auth.rol) === API_AUTH.ROLES[0];

    const detallesVisualizacion = useParams();
    const codigoProducto = detallesVisualizacion.codigoProducto;
    const codigoTienda = detallesVisualizacion.idTienda;

    const [idProducto, setIdProducto] = React.useState();
    const [nombre, setNombre] = React.useState('');
    const [talle, setTalle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [imagen, setImagen] = React.useState('');
    const [estado, setEstado] = React.useState();

    const [stock, setStock] = React.useState(0);

    const [finalizado, setFinalizado] = React.useState(false);

    React.useEffect(() => {
        fetch(API_PRODUCTO.OBTENER, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigoProducto,
                codigoTienda
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
                setStock(response.stock[0]?.cantidad)
            })
    }, []);

    // ACCIONES
    const guardarOnClick = () => {
        const modificacion = { idProducto, codigo: codigoProducto, nombre, talle, color, imagen, habilitado: estado }
        console.table(modificacion);
        fetch(API_PRODUCTO.MODIFICAR, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modificacion),
        })
            .then(response => response.json())
            .then(response => {
                setFinalizado(true);
                alert('Cambios guardados')
            })
    };

    const actualizarStock_onClick = (e) => {
        e.preventDefault();

        const modificacion = {
            codigoProducto,
            codigoTienda,
            cantidad: parseInt(stock)
        }

        fetch(API_PRODUCTO.MODIFICAR_STOCK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modificacion),
        })
            .then(response => response.json())
            .then(response => {
                alert('Stock modificado');
            })
    }

    return (
        <div>
            {finalizado && <Navigate to={"/productos"} />}
            <h1>
                <FontAwesomeIcon icon={faTags} />
                <span>Producto </span>
                <span>{codigoProducto}</span>
            </h1>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Tienda"}
                        value={codigoTienda}
                        enabled={false}
                    />
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
                            <option value="1" selected={estado}>Habilitado</option>
                            <option value="0" selected={!estado}>Deshabilitado</option>
                        </select>
                    </div>

                    <div className={styles.stock}>
                        <TextInput
                            label={"Stock"}
                            value={stock}
                            onChange={(value) => setStock(value)}
                            enabled={deSucursal}
                        />
                        {deSucursal && (
                            <button onClick={actualizarStock_onClick}>Actualizar</button>
                        )}
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