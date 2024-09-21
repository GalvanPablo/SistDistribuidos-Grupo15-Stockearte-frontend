import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'
import styles from "./Tienda.module.css"

import { Link } from 'react-router-dom'

import { API_TIENDA } from '../../../data/api'

const Tienda = () => {
    const Item = ({ codigo, estado }) => (
        <tr className={styles.tabla__fila}>
            <td>{codigo}</td>
            <td>{estado}</td>
            <td className={styles.tabla__celdaAciones}>
                <Link to={`/tiendas/tienda/${codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
                </Link>
            </td>
        </tr>
    );

    const [codigo, setCodigo] = React.useState('');
    const [habilitado, setHabilitado] = React.useState(true);

    const [tiendas, setTiendas] = React.useState([]);

    const obtenerListado = () => {
        const filtros = {
            codigo,
            habilitado
        }

        fetch(API_TIENDA.LISTADO, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtros),
        })
            .then(response => response.json())
            .then(response => {
                setTiendas(response.tiendas);
            })
    };

    React.useEffect(() => {
        obtenerListado();
    }, [codigo, habilitado]); // BUSCAR EN CADA CAMBIO DE FILTRO

    return (
        <>
            <h1>Listado de Tiendas</h1>
            <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/tiendas/nueva`} className={styles.nuevo}>Nueva Tienda</Link>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Código' onChange={(e) => setCodigo(e.target.value)}/>
                        <select name="habilitado" id="habilitado" onChange={(e) => setHabilitado(e.target.value == 1)}>
                            <option value="1">Habilitadas</option>
                            <option value="0">Deshabilitadas</option>
                        </select>
                        <button onClick={obtenerListado}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla__encabezado}>
                        <tr>
                            <th className={styles.columna_codigo}>Código</th>
                            <th>Estado</th>
                            <th className={styles.columna_acciones}>Detalle</th>
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