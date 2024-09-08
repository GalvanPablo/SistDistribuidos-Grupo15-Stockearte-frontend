import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from "./Tienda.module.css"

import { Link } from 'react-router-dom'



const Tienda = () => {
    const Item = ({ codigo, nombre, estado }) => (
        <tr className={styles.tabla__fila}>
            <td>{codigo}</td>
            <td>{nombre}</td>
            <td>{estado}</td>
            <td>
                <Link to={`/tiendas/tienda/${codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} />
                </Link>
            </td>
        </tr>
    );

    const tiendas = [
        { codigo: "ABCDE1234", nombre: "Sucursal Lanús", estado: "Habilitada"},
        { codigo: "FGHIJ5678", nombre: "Sucursal Avellaneda", estado: "Deshabilitada"},
        { codigo: "KLMNOP9012", nombre: "Sucursal Quilmes", estado: "Habilitada"},
    ];

    return (
        <>
            <h1>Listado de tiendas</h1>
            <div className={styles.listado}>
                
                <div className={styles.toolbar}>
                    <Link to={`/tiendas/nueva`} className={styles.nuevo}>Nueva Tienda</Link>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Código'/>
                        <select name="" id="">
                            <option value="-1">(Todos)</option>
                            <option value="1">Habilitadas</option>
                            <option value="2">Deshabilitadas</option>
                        </select>
                        <button>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla__encabezado}>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {tiendas.map((tienda, index) => (
                            <Item
                                key={index}
                                codigo={tienda.codigo}
                                nombre={tienda.nombre}
                                estado={tienda.estado}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tienda