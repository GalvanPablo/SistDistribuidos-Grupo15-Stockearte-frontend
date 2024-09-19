import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from './Usuario.module.css'

import { Link } from 'react-router-dom'

import { API_USUARIO } from '../../../data/api'

const Usuario = () => {
    
    const Item = ({ nombre, tienda, estado, id }) => (
        <tr className={styles.tabla__fila}>
            <td>{nombre}</td>
            <td>{tienda.codigo}</td>
            <td>{estado}</td>
            <td className={styles.tabla__celdaAciones}>
                <Link to={`/usuarios/usuario/${id}`} title='ver detalle'> {/*revisar*/}
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
                </Link>
            </td>
        </tr>
    );
    
    const [nombre, setNombre] = React.useState('')
    const [codigoTienda, setCodigoTienda] = React.useState('')

    const [usuarios, setUsuarios] = React.useState([])

    const obtenerListado = () => {
        const filtros = {
            nombre,
            codigo: codigoTienda
            // ...(codigoTienda.length !== 0 && {codigo: codigoTienda})
        }

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
                setUsuarios(response.usuarios); //! NO TRAE DATOS DE LA TIENDA RELACIONADA ADEMASD DE QUE FILTRA SIN QUE SE LO ESPECIFIQUE A TODOS LOS USUARIOS CON TIENDAS
            })
    };

    React.useEffect(() => {
        obtenerListado();
    }, [nombre, codigoTienda]); // BUSCAR EN CADA CAMBIO DE FILTRO

    return (
     <>
        <h1>Usuarios</h1>
        <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <Link to={`/usuarios/nueva`} className={styles.nuevo}>Nuevo Usuario</Link>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}/>
                        <input type="text" name="" id="" placeholder='Código de Tienda' onChange={(e) => setCodigoTienda(e.target.value)}/>
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
                                tienda={usuario.tienda}
                                estado={usuario.habilitado?'Habilitado':'Deshabilitado'}
                                id={usuario.idUsuario}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
     </>
    )
}

export default Usuario