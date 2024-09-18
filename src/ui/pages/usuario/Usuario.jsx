import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from './Usuario.module.css'

import { Link } from 'react-router-dom'

import { API_USUARIO } from '../../../data/api'

const Usuario = () => {
    
    const Item = ({ nombre, tienda_id, estado }) => (
        <tr className={styles.tabla__fila}>
            <td>{nombre}</td>
            <td>{tienda_id}</td>
            <td>{estado}</td>
            <td className={styles.tabla__celdaAciones}>
                <Link to={`/usuarios/usuario/${nombre}`} title='ver detalle'> {/*revisar*/}
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
                </Link>
            </td>
        </tr>
    );
    
    const [nombre, setNombre] = React.useState('')
    const [tienda_id, setTienda] = React.useState('')
    const [habilitado, setHabilitado] = React.useState('')

    const [usuarios, setUsuarios] = React.useState([])

    const obtenerListado = () => {
        const filtros = {
            nombre,
            tienda_id,
            habilitado
        }

        console.log(API_USUARIO.LISTADO);
        console.log(filtros);

        fetch(API_USUARIO.LISTADO, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtros),
        })
            .then(response => response.json())
            .then(response => {
                setUsuarios(response.usuarios);
            })
    };

    React.useEffect(() => {
        obtenerListado();
    }, [nombre, tienda_id, habilitado]); // BUSCAR EN CADA CAMBIO DE FILTRO

    return (
     <>
        <h1>Usuarios</h1>
        <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/usuarios/nueva`} className={styles.nuevo}>Nuevo Usuario</Link>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}/>
                        <input type="text" name="" id="" placeholder='Tienda' onChange={(e) => setTienda(e.target.value)}/>
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
                            <th>Nombre</th>
                            <th>Tienda</th>
                            <th>Estado</th>
                            <th className={styles.columna_acciones}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {usuarios.map((usuario, index) => (
                            <Item
                                key={index}
                                nombre={usuario.nombre}
                                tienda={usuario.tienda_id}
                                estado={usuario.habilitado?'Habilitada':'Deshabilitada'}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
     </>
    )
}

export default Usuario