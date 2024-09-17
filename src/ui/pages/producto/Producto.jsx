import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from './Producto.module.css'

import { Link } from 'react-router-dom';

import { API_PRODUCTO } from '../../../data/api'

import { useSelector } from 'react-redux';
import { API_AUTH } from '../../../data/api';

const Producto = () => {
       const UsuarioID = useSelector(state => state.auth.id);
       const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];

    const Item = ({ codigo, nombre, talle, color, tienda }) => (
        <tr className={styles.tabla__fila}>
            <td>{codigo}</td>
            <td>{nombre}</td>
            <td>{talle}</td>
            <td>{color}</td>
            {deCentral && (
                <td>{tienda}</td>
            )}
            <td>
                <Link to={`/productos/producto/${codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
                </Link>
            </td>
        </tr>
    );

    const [codigo, setCodigo] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [talle, setTalle] = React.useState('');
    const [color, setColor] = React.useState('');

    const [productos, setProductos] = React.useState([]);

    const obtenerListado = () => {
        fetch(API_PRODUCTO.LISTADO(UsuarioID), { //REVISAR USUARIOID 
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     codigo: null,
            //     habilitado: true
            // }),
        })
            .then(response => response.json())
            .then(response => {
                if (Array.isArray(response)) {
                    setProductos(response);
                } else {
                    setProductos([]);
                }
            })
    };

    React.useEffect(() => {
        obtenerListado();
    }, [codigo, nombre, talle, color]); // BUSCAR EN CADA CAMBIO DE FILTRO

    return (
        <>
            <h1>Listado de Productos</h1>
            <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/productos/nueva`} className={styles.nuevo}>Nuevo Producto</Link>

                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Codigo' onChange={(e) => setCodigo(e.target.value)}/>
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}/>
                        <input type="text" name="" id="" placeholder='Talle' onChange={(e) => setTalle(e.target.value)}/>
                        <input type="text" name="" id="" placeholder='Color' onChange={(e) => setColor(e.target.value)}/>
                        <button onClick={obtenerListado}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            {deCentral && (
                                <th>Tienda</th>
                            )}
                            <th className={styles.columna_acciones}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {productos.map((producto, index) => (
                            <Item
                                key={index}
                                codigo={producto.codigo}
                                nombre={producto.nombre}
                                talle={producto.talle}
                                color={producto.color}
                                tienda={producto.tienda}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Producto