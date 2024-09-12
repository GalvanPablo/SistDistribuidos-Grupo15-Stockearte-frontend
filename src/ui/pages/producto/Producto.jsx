import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from './Producto.module.css'

import { Link } from 'react-router-dom';

import { API_PRODUCTO } from '../../../data/api'

const Producto = () => {
    const Item = ({ codigo, nombre, talle, color, tienda }) => (
        <tr className={styles.tabla__fila}>
            <td>{codigo}</td>
            <td>{nombre}</td>
            <td>{talle}</td>
            <td>{color}</td>
            <td>{tienda}</td>
            <td>
                <Link to={`/productos/producto/${codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} />
                </Link>
            </td>
        </tr>
    );

    const [productos, setProductos] = React.useState([]);

    React.useEffect(() => {
        // setTiendas([
        //     { codigo: "ABCDE1234", nombre: "Sucursal Lanús", estado: "Habilitada" },
        //     { codigo: "FGHIJ5678", nombre: "Sucursal Avellaneda", estado: "Deshabilitada" },
        //     { codigo: "KLMNOP9012", nombre: "Sucursal Quilmes", estado: "Habilitada" },
        // ])

        fetch(API_PRODUCTO.LISTADO, {
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
                setProductos(response);
            })
    }, []);

    /*function traerString(longitud) {
        let resultado = '';
        const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const carLon = caracteres.length;

        for (let i = 0; i < longitud; i++) {

            // Genero un indice random
            const aux = Math.floor(Math.random() * carLon);

            resultado += caracteres.charAt(aux);
        }

        return resultado;
    }

    const codAleatorio = traerString(10);
    const codAleatorio1 = traerString(10);
    const codAleatorio2 = traerString(10);

    const productos = [
        { codigo: codAleatorio, nombre: "Remera", talle: "M", color: "negro", tienda: "Sucursal Avellaneda" },
        { codigo: codAleatorio1, nombre: "Pantalon", talle: "M", color: "rojo", tienda: "Sucursal Avellaneda" },
        { codigo: codAleatorio2, nombre: "Remera", talle: "XL", color: "blanco", tienda: "Sucursal Quilmes" },
    ];*/

    return (
        <>
            <h1>Listado de Productos</h1>
            <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/productos/nueva`} className={styles.nuevo}>Nuevo Producto</Link>

                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='codigo' />
                        <input type="text" name="" id="" placeholder='nombre' />
                        <input type="text" name="" id="" placeholder='talle' />
                        <input type="text" name="" id="" placeholder='color' />
                        <button>
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
                            <th>Tienda</th>
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