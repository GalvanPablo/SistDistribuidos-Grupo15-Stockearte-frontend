import React from 'react'

import styles from './DetalleProducto.module.css'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { API_PRODUCTO } from '../../../../data/api'
import { API_AUTH } from '../../../../data/api';

const DetalleProducto = () => {
    const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];
    const detallesVisualizacion = useParams();

    const productoId = detallesVisualizacion.id;

    const Item = ({ nombre, imagen, talle, color, tienda }) => (
        <tr className={styles.tabla__fila}>
            <td>{nombre}</td>
            <td>{imagen}</td>
            <td>{talle}</td>
            <td>{color}</td>
            <td>{tienda}</td>           
        </tr>
    );

    const [productos, setProductos] = React.useState([]);

    React.useEffect(() => {
        fetch(API_PRODUCTO.DETALLE(productoId), {
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
    }, []);


    return (
        <div>
            <h1>Producto: {productoId}</h1>
            <div className={styles.listado}>
            
               <div>
                 <h2>Nombre: </h2>
                 <h2>Imagen: </h2>
                 <h2>Talle: </h2>
                 <h2>Color: </h2>
                 <h2>Tienda: </h2>
                 <h2>Stock: </h2>
                 
               </div>
                 
                    
            </div>
        </div>
        
    )
}

export default DetalleProducto