import React, { useEffect } from 'react'

import styles from './DetalleOrdenCompra.module.css'
import { useParams } from 'react-router-dom';
import { TextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { API_TIENDA } from '../../../../data/api'
import { faFileExport, faCheckCircle, faExclamationTriangle, faRectangleTimes, faSkull } from '@fortawesome/free-solid-svg-icons'

const DetalleOrdenCompra = () => {
    const detallesVisualizacion = useParams();
    const idOrdenCompra = detallesVisualizacion.id;

    const [idOrden, setIdOrden] = React.useState(idOrdenCompra);
    const [estado, setEstado] = React.useState('');
    const [observaciones, setObservaciones] = React.useState('');
    const [tienda, setTienda] = React.useState('');
    const [fechaSolicitud, setFechaSolicitud] = React.useState('');
    const [fechaRecepcion, setFechaRecepcion] = React.useState('');
    const [productos, setProductos] = React.useState([]);

    /*
    React.useEffect(() => {
        fetch(API_ORDEN_DE_COMPRA.DETALLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idOrdenCompra
            }),
        })
            .then(response => response.json())
            .then(response => {
                setNombre(response.nombre);
                setEmail(response.email);
                setClave(response.clave);
                setEstado(response.habilitado);
            })
    }, [idOrdenCompra]);
    
    */

    // TRAER DATOS
    useEffect(() => {
        setIdOrden(1);
        setEstado('Aceptada');
        setObservaciones('Producto inexistente');
        setTienda('ABCD1234');
        setFechaSolicitud('23/5/24');
        setFechaRecepcion('10/6/24');
        setProductos([
            { nombre: 'Remera', talle: 'S', color: 'Amarillo', cantidad: 3, estado: 'No existe' },
            { nombre: 'Pantalon', talle: 'M', color: 'Azul', cantidad: 23, estado: 'Stock insuficiente' },
            { nombre: 'Remera', talle: 'S', color: 'Negro', cantidad: 3, estado: 'Todo bien' },
        ]);
    }, []);

    /*const guardarCambios = () => {
        const ordenCompra = {
            idOrden,
            estado,
            observaciones,
            tienda,
            fechaSolicitud,
            fechaRecepcion,
            productos
        }
        console.log(ordenCompra);
    };*/

    //Mapeo de estados a iconos
    const getIconForState = (estado) => {
        switch (estado) {
            case 'No existe':
                return <FontAwesomeIcon icon={faRectangleTimes} className={styles.tabla__iconoRojo} />
            case 'Stock insuficiente':
                return <FontAwesomeIcon icon={faExclamationTriangle} className={styles.tabla__iconoAmarillo} />
            case 'Todo bien':
                return <FontAwesomeIcon icon={faCheckCircle} className={styles.tabla__iconoVerde} />
            default:
                return <FontAwesomeIcon icon={faSkull} />
        }

    }

    const Item = ({ producto }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{producto.nombre}</td>
                <td>{producto.talle}</td>
                <td>{producto.color}</td>
                <td>{producto.cantidad}</td>
                <td>{getIconForState(producto.estado)}</td>
            </tr>

        )
    };


    return (
        <>
            <h1>
                <FontAwesomeIcon icon={faFileExport} />
                <span>Detalle de Orden de Compra: </span>
                <span>{idOrden}</span>
            </h1>

            <div>
                <div className={styles.listado}>
                    <div className={styles.toolbar}>
                        <form action="">

                            <div className={styles.info}>
                                <h3>ID: {idOrden} / Estado: {estado} / Observaciones: {observaciones}</h3>
                                <h3>Tienda: {tienda}</h3>
                                <h3>Fecha Solicitud: {fechaSolicitud}</h3>
                                <h3>Fecha Recepcion: {fechaRecepcion}</h3>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <table className={styles.tabla}>
                        <thead className={styles.tabla_encabezado}>
                            <tr>
                                <th>Nombre</th>
                                <th>Talle</th>
                                <th>Color</th>
                                <th>Cantidad</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tabla__cuerpo}>
                            {productos.map((producto, index) => (
                                <Item
                                    key={index}
                                    producto={producto} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <button className={styles.nuevo} onClick={() => guardarCambios()}>Guardar Cambios</button>*/}
                {/*Seccion de leyenda para iconos*/}
                <div className={styles.toolbar}>
                    <div className={styles.leyenda}>
                        <h3>Descripción de los íconos de estado:</h3>
                        <ul>
                            <li><FontAwesomeIcon icon={faRectangleTimes} className={styles.tabla__iconoRojo} /> - No existe</li>
                            <li><FontAwesomeIcon icon={faExclamationTriangle} className={styles.tabla__iconoAmarillo} /> - Stock insuficiente</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} className={styles.tabla__iconoVerde} /> - Todo bien</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalleOrdenCompra