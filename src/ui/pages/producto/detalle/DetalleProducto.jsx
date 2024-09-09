import React from 'react'

import styles from './DetalleProducto.module.css'

import { useParams } from 'react-router-dom'
import Producto from '../Producto'

const DetalleProducto = () => {
    const detallesVisualizacion = useParams();

    const productoId = detallesVisualizacion.id;

    return (
        <div>
            <h1>DetalleProducto</h1>
            <p>{productoId}</p>
        </div>
        
    )
}

export default DetalleProducto