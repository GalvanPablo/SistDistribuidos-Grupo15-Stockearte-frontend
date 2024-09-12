import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from "./Tienda.module.css"

import { Link } from 'react-router-dom'

import { API_TIENDA } from '../../../data/api'



const Tienda = () => {
    const Item = ({ codigo, nombre, estado }) => (
        <tr className={styles.tabla__fila}>
            <td>{codigo}</td>
            <td>{estado}</td>
            <td>
                <Link to={`/tiendas/tienda/${codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} />
                </Link>
            </td>
        </tr>
    );

    const [tiendas, setTiendas] = React.useState([]);

    React.useEffect(() => {
        // setTiendas([
        //     { codigo: "ABCDE1234", nombre: "Sucursal Lanús", estado: "Habilitada" },
        //     { codigo: "FGHIJ5678", nombre: "Sucursal Avellaneda", estado: "Deshabilitada" },
        //     { codigo: "KLMNOP9012", nombre: "Sucursal Quilmes", estado: "Habilitada" },
        // ])

        fetch(API_TIENDA.LISTADO, {
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
                setTiendas(response);
            })
    }, []);

    return (
        <>
            <h1>Listado de Tiendas</h1>
            <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/tiendas/nueva`} className={styles.nuevo}>Nueva Tienda</Link>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Código' />
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
                            <th>Estado</th>
                            <th className={styles.columna_acciones}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {tiendas.map((tienda, index) => (
                            <Item
                                key={index}
                                codigo={tienda.codigo}
                                estado={tienda.habilitado?'Habilitada':'Deshabilitada'}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tienda