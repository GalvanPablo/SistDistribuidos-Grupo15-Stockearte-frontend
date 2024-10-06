import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

import { API_TIENDA } from '../../../data/api'

import styles from './OrdenCompra.module.css'
const OrdenCompra = () => {
    const [ordenesCompra, setOrdenesCompra] = useState([]);
    const [estado, setEstado] = useState('')

    useEffect(() => {
        getOrdenesCompra();
    }, [])

    useEffect(() => {
        getOrdenesCompra();
    }, [estado])

    const getOrdenesCompra = () => {
        setOrdenesCompra([
            {
                codigoOrdenCompra: 'OC1',
                fechaSolicitud: '28/09/2024',
                estado: 'Solicitada',
                observaciones: '',
                fechaRecepcion: '',
                despachada: false
            },
            {
                codigoOrdenCompra: 'OC2',
                fechaSolicitud: '27/09/2024',
                estado: 'Aceptada',
                observaciones: 'Stock faltante',
                fechaRecepcion: '',
                despachada: false
            },
            {
                codigoOrdenCompra: 'OC3',
                fechaSolicitud: '27/09/2024',
                estado: 'Aceptada',
                observaciones: '',
                fechaRecepcion: '',
                despachada: true
            },
            {
                codigoOrdenCompra: 'OC4',
                fechaSolicitud: '20/09/2024',
                estado: 'Recibida',
                observaciones: '',
                fechaRecepcion: '21/09/24',
                despachada: true
            },
            {
                codigoOrdenCompra: 'OC5',
                fechaSolicitud: '18/09/2024',
                estado: 'Rechazada',
                observaciones: 'Producto Inexistente',
                fechaRecepcion: '',
                despachada: false
            },
        ]);
    }

    const ItemOC = ({ orden }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{orden.fechaSolicitud}</td>
                <td>{orden.estado}</td>
                <td>{orden.observaciones}</td>
                <td>
                    {orden.estado === 'Recibida' && orden.despachada ? (
                        <span>{orden.fechaRecepcion}</span>
                    ) : orden.estado === 'Aceptada' && orden.despachada ? (
                        <button className={styles.bntRecibir}
                            onClick={() => {
                                alert(`Recibiendo la Orden: ${orden.codigoOrdenCompra}`)
                            }}
                        >
                            Recibir
                        </button>
                    ) : ''}
                </td>
                <td style={{textAlign: 'center'}}>
                    <Link to={`/ordenesDeCompra/detalle/${orden.codigoOrdenCompra}}`} title='ver detalle'>
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
                    <div className={styles.toolbar__filtro__container}>
                        <select name="habilitado" id="habilitado" onChange={(e) => setEstado(e.target.value)}>
                            <option value="">Todas</option>
                            <option value="Solicitada">Solicitada</option>
                            <option value="Rechazada">Rechazada</option>
                            <option value="Aceptada">Aceptada</option>
                            <option value="Recibida">Recibida</option>
                        </select>
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla__encabezado}>
                        <tr>
                            <th>Fecha Solicitud</th>
                            <th>Estado</th>
                            <th>Observaciones</th>
                            <th>Recepción</th>
                            <th className={styles.columna_acciones} style={{textAlign: 'center'}}>Detalle</th>
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