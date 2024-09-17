import React from 'react'

import { useParams } from "react-router-dom"
import { TextInput, Modal } from '../../../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons'

import { API_TIENDA, API_USUARIO, API_PRODUCTO } from '../../../../data/api';

import styles from './DetalleTienda.module.css'
const DetalleTienda = () => {
    const detallesVisualizacion = useParams();
    const codigo = detallesVisualizacion.id;
    const [idTienda, setIdTienda] = React.useState();
    const [direccion, setDireccion] = React.useState('');
    const [ciudad, setCiudad] = React.useState('');
    const [provincia, setProvincia] = React.useState('');
    const [estado, setEstado] = React.useState();

    const [usuariosAsociados, setUsuariosAsociados] = React.useState([]);
    const [productosAsociados, setProductosAsociados] = React.useState([]);

    const [usuariosNoAsociados, setUsuariosNoAsociados] = React.useState([]);
    const [productosNoAsociados, setProductosNoAsociados] = React.useState([]);

    React.useEffect(() => {
        fetch(API_TIENDA.OBTENER, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo
            }),
        })
            .then(response => response.json())
            .then(response => {
                setIdTienda(response.idTienda);
                setDireccion(response.direccion);
                setCiudad(response.ciudad);
                setProvincia(response.provincia);
                setEstado(response.habilitado);
            })
    }, []);

    React.useEffect(() => {
        actualizarUsuarios();
        actualizarProductos();
    }, [idTienda]);

    const ItemUsuario = ({ usuario, asignar }) => (
        <tr>
            <th>{usuario.nombre}</th>
            <th>
                {asignar ? (
                    <FontAwesomeIcon icon={faLink} onClick={() => asignarUsuario_onClick(usuario.idUsuario)} />
                ) : (
                    <FontAwesomeIcon icon={faLinkSlash} onClick={() => desasignarUsuario_onClick(usuario.idUsuario)} />
                )}
            </th>
        </tr>
    )

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

    // ACIONES
    const guardarOnClick = () => {
        fetch(API_TIENDA.MODIFICAR, {
            method: 'PUT', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idTienda, codigo, direccion, ciudad, provincia, habilitado: estado }),
        })
            .then(response => response.json())
            .then(response => {
                alert('Cambios guardados')
            })
    };

    const asignarUsuario_onClick = (idUsuario) => {
        fetch(API_TIENDA.USUARIO_ASIGNAR, {
            method: 'POST', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTienda,
                idUsuario
            }),
        })
            .then(response => response.json())
            .then(response => {
                actualizarUsuarios();
            })

    };
    const desasignarUsuario_onClick = (idUsuario) => {
        fetch(API_TIENDA.USUARIO_DESASIGNAR, {
            method: 'POST', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTienda,
                idUsuario
            }),
        })
            .then(response => response.json())
            .then(response => {
                actualizarUsuarios();
            })

    }

    const asignarProducto_onClick = (idProducto) => {
        fetch(API_TIENDA.PRODUCTO_ASGINAR, {
            method: 'POST', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTienda,
                idProducto
            }),
        })
            .then(response => response.json())
            .then(response => {
                actualizarProductos();
            })

    };
    const desasignarProducto_onClick = (idProducto) => {
        fetch(API_TIENDA.PRODUCTO_DESASGINAR, {
            method: 'POST', headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idTienda,
                idProducto
            }),
        })
            .then(response => response.json())
            .then(response => {
                actualizarProductos();
            })

    };

    const actualizarUsuarios = () => {
        if (idTienda) {
            // Actualizar asignación
            fetch(API_USUARIO.ASIGNADOS, {
                method: 'POST', headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idTienda
                }),
            })
                .then(response => response.json())
                .then(response => {
                    setUsuariosAsociados(response.usuarios);
                })

            // Actualizar no asignados
            fetch(API_USUARIO.NO_ASIGNADOS, {
                method: 'POST', headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
            })
                .then(response => response.json())
                .then(response => {
                    setUsuariosNoAsociados(response.usuarios);
                })
        }
    };

    const actualizarProductos = () => {
        if (idTienda) {
            // Actualizar asignación
            fetch(API_PRODUCTO.ASIGNADOS, {
                method: 'POST', headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idTienda
                }),
            })
                .then(response => response.json())
                .then(response => {
                    setProductosAsociados(response.productos);
                })

            // Actualizar no asignados
            fetch(API_PRODUCTO.NO_ASIGNADOS, {
                method: 'POST', headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idTienda
                }),
            })
                .then(response => response.json())
                .then(response => {
                    setProductosNoAsociados(response.productos);
                })
        }
    };

    return (
        <div>
            <h1>
                <FontAwesomeIcon icon={faShop} />
                <span>{codigo}</span>
            </h1>
            <div>
                <form className={styles.form}>
                    <TextInput
                        label={"Dirección"}
                        value={direccion}
                        onChange={(value) => setDireccion(value)}
                    />
                    <TextInput
                        label={"Ciudad"}
                        value={ciudad}
                        onChange={(value) => setCiudad(value)}
                    />
                    <TextInput
                        label={"Provincia"}
                        value={provincia}
                        onChange={(value) => setProvincia(value)}
                    />

                    <div className={styles.input_estado}>
                        <label htmlFor="habilitada">Estado</label>
                        <select name="habilitada" id="habilitada"
                            onChange={({ target: { value } }) => setEstado(value === "1")}
                        >
                            <option value="1" selected={estado}>Habilitada</option>
                            <option value="0" selected={!estado}>Deshabilitada</option>
                        </select>
                    </div>

                    <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                        Guardar
                    </button>
                </form>
            </div>
            <div className={styles.listviews__container}>
                <div className={styles.listview}>
                    <div className={styles.listview__encabezado}>
                        <span>Usuarios asignados</span>
                        <div>
                            <Modal
                                title={'Asignar Usuario'}
                                width={'500px'}
                                btnAction={'Asginar'}
                            >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th className={styles.columna_accion}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuariosNoAsociados.map((usuario, index) => (
                                            <ItemUsuario key={index} usuario={usuario} asignar={true} />
                                        ))}
                                    </tbody>
                                </table>
                            </Modal>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <th>Nombre</th>
                            <th className={styles.columna_accion}></th>
                        </thead>
                        <tbody>
                            {usuariosAsociados.map((usuario, index) => (
                                <ItemUsuario key={index} usuario={usuario} asignar={false} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.listview}>
                    <div className={styles.listview__encabezado}>
                        <span>Productos asignados</span>
                        <div>
                            <Modal
                                title={'Asignar Producto'}
                                width={'500px'}
                                btnAction={'Asginar'}
                            >
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
                            </Modal>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th className={styles.columna_accion}></th>
                        </thead>
                        <tbody>
                            {productosAsociados.map((producto, index) => (
                                <ItemProducto key={index} producto={producto} asignar={false} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetalleTienda