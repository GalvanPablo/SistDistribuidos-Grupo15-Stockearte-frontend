import React, { useState } from 'react'

import { ModalGeneric } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import styles from './DetalleCatalogo.module.css'
import { API_CATALOGO } from '../../../../data/api';

const DetalleCatalogo = () => {
    const detallesVisualizacion = useParams();
    const idCatalogo = detallesVisualizacion.id;

    const [productosAsociados, setProductosAsociados] = React.useState([]);
    const [productosNoAsociados, setProductosNoAsociados] = React.useState([]);

    const actualizarProductos = () => {
        // // Actualizar asignación
        // fetch(API_CATALOGO.ASIGNADOS, {
        //     method: 'POST', headers: {
        //         // 'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idCatalogo
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         setProductosAsociados(response.productos);
        //     })

        // // Actualizar no asignados
        // fetch(API_CATALOGO.NO_ASIGNADOS, {
        //     method: 'POST', headers: {
        //         // 'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idCatalogo
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         setProductosNoAsociados(response.productos);
        //     })
    };

    const asignarProducto_onClick = (idProducto) => {
        // fetch(API_CATALOGO.PRODUCTO_ASGINAR, {
        //     method: 'POST', headers: {
        //         // 'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idTienda,
        //         idProducto
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         actualizarProductos();
        //     })

    };
    const desasignarProducto_onClick = (idProducto) => {
        // fetch(API_CATALOGO.PRODUCTO_DESASGINAR, {
        //     method: 'POST', headers: {
        //         // 'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idTienda,
        //         idProducto
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         actualizarProductos();
        //     })

    };

    const [modalOpen, setModalOpen] = useState(false);
    const onCloseModal = () => {
        setModalOpen(false);
    };

    const ItemProducto = ({ producto, asignar }) => (
        <tr>
            <th>{producto.nombre}</th>
            <th>{producto.talle}</th>
            <th>{producto.color}</th>
            <th>
                {asignar ? (
                    <FontAwesomeIcon icon={faLink} onClick={() => asignarProducto_onClick(producto.idProducto)} />
                ) : (
                    <FontAwesomeIcon icon={faLinkSlash} onClick={() => desasignarProducto_onClick(producto.idProducto)} />
                )}
            </th>
        </tr>
    )


    return (
        <>
            <h1>Detalles del catálogo</h1>
            <div className={styles.listview}>
                <div className={styles.listview__encabezado}>
                    <span>Productos asignados</span>
                    <div>
                        <button onClick={() => setModalOpen(true)}>Asignar</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th className={styles.columna_accion}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosAsociados.map((producto, index) => (
                            <ItemProducto key={index} producto={producto} asignar={false} />
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalGeneric isOpen={modalOpen} onClose={onCloseModal} showCloseButton={false}>
                <div className={styles.listview}>
                    <div className={styles.listview__encabezado}>
                        <h3>Asignar Productos</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Talle</th>
                                <th>Color</th>
                                <th className={styles.columna_accion}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosNoAsociados.map((producto, index) => (
                                <ItemProducto key={index} producto={producto} asignar={true} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </ModalGeneric>
        </>
    )
}

export default DetalleCatalogo