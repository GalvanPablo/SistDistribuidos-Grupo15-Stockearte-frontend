import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

import { API_TIENDA } from '../../../data/api'

import styles from './OrdenCompra.module.css'
import { useSelector } from 'react-redux'
const OrdenCompra = () => {
    const idUsuario = useSelector(state => state.auth.idUsuario);

    const [ordenesCompra, setOrdenesCompra] = useState([]);
    const [estado, setEstado] = useState('')

    useEffect(() => {
        getOrdenesCompra();
    }, [])

    useEffect(() => {
        getOrdenesCompra();
    }, [estado])

    const getOrdenesCompra = () => {
        fetch(API_TIENDA.TRAER_ORDEN_COMPRA, {
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
                setOrdenesCompra(response.ordenes?.sort((a, b) => b.idOrdenCompra - a.idOrdenCompra));
            })
    }

    const recibirPedido = (idOrdenCompra) => {
        alert(idOrdenCompra);
        fetch(API_TIENDA.RECIBIR_PEDIDO, {
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
                getOrdenesCompra();
            })
    }

    const ItemOC = ({ orden }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{orden.fechaSolicitud}</td>
                <td>{orden.estado}</td>
                <td>{orden.observaciones}</td>
                <td>
                    {orden.estado === 'RECIBIDA' && orden.despachada ? (
                        <span>{orden.fechaRecepcion}</span>
                    ) : orden.estado === 'ACEPTADA' && orden.despachada ? (
                        <button className={styles.bntRecibir}
                            onClick={()=>recibirPedido(orden.idOrdenCompra)}
                        >
                            Recibir
                        </button>
                    ) : ''}
                </td>
                <td style={{ textAlign: 'center' }}>
                    <Link to={`/ordenesDeCompra/detalle/${orden.idOrdenCompra}`} title='ver detalle'>
                        <FontAwesomeIcon icon={faFileLines} className={styles.icono_detalles} />
                    </Link>
                </td>
            </tr>
        )
    };

    return (
        <>
            <h1>Ordenes de Compra</h1>
            <div className={styles.listado}>
                <div className={styles.toolbar}>
                    <Link to={'/ordenesDeCompra/nueva'} className={styles.nuevo}>Nueva Orden</Link>
                    {/* <div className={styles.toolbar__filtro__container}>
                        <select name="habilitado" id="habilitado" onChange={(e) => setEstado(e.target.value)}>
                            <option value="">Todas</option>
                            <option value="Solicitada">Solicitada</option>
                            <option value="Rechazada">Rechazada</option>
                            <option value="Aceptada">Aceptada</option>
                            <option value="Recibida">Recibida</option>
                        </select>
                    </div> */}
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla__encabezado}>
                        <tr>
                            <th>Fecha Solicitud</th>
                            <th>Estado</th>
                            <th>Observaciones</th>
                            <th>Recepción</th>
                            <th className={styles.columna_acciones} style={{ textAlign: 'center' }}>Detalle</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {ordenesCompra.map((orden, index) => (
                            <ItemOC
                                key={index}
                                orden={orden}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrdenCompra