import React from 'react'

import styles from './DetalleTienda.module.css'

import { useParams } from "react-router-dom"
import Tienda from '../Tienda';

const DetalleTienda = () => {
    const detallesVisualizacion = useParams();

    const tiendID = detallesVisualizacion.id;

    return (
        <div>
            <h1>DetalleTienda</h1>
            <p>{tiendID}</p>
        </div>
    )
}

export default DetalleTienda