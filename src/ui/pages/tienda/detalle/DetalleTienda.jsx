import React from 'react'

import { useParams } from "react-router-dom"
import { TextInput, Modal } from '../../../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons'

import { API_TIENDA } from '../../../../data/api';

import styles from './DetalleTienda.module.css'
const DetalleTienda = () => {
    const detallesVisualizacion = useParams();
    const tiendaID = detallesVisualizacion.id;

    const [direccion, setDireccion] = React.useState('');
    const [ciudad, setCiudad] = React.useState('');
    const [provincia, setProvincia] = React.useState('');
    const [estado, setEstado] = React.useState();

    const [usuariosAsociados, setUsuariosAsociados] = React.useState([]);
    const [productosAsociados, setProductosAsociados] = React.useState([]);

    const [usuariosNoAsociados, setUsuariosNoAsociados] = React.useState([]);
    const [productosNoAsociados, setProductosNoAsociados] = React.useState([]);

    React.useEffect(() => {
        // fetch(API_TIENDA.OBTENER(tiendaID), {
        fetch(API_TIENDA.OBTENER(1), { //! ESTO ESTA HARDCODEADO - EL ENDPOINT NO RECIBE EL CODIGO SINO EL ID DE LA TIENDA, DEBE DE SER CAMBIADO
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
                setDireccion(response.direccion);
                setCiudad(response.ciudad);
                setProvincia(response.provincia);
                setEstado(response.habilitado);
            })

        actualizarUsuarios();
        actualizarProductos();

        setUsuariosAsociados([
            { codigo: 'DSADSADAS', nombre: 'Pablo' }
        ])

        setUsuariosNoAsociados([
            { codigo: 'DSADSADAS', nombre: 'No Pablo' }
        ])
    }, []);

    const ItemUsuario = ({ usuario, asignar }) => (
        <tr>
            <th>{usuario.nombre}</th>
            <th>
                {asignar ? (
                    <FontAwesomeIcon icon={faLink} onClick={() => asignarUsuario_onClick(usuario.codigo)} />
                ) : (
                    <FontAwesomeIcon icon={faLinkSlash} onClick={() => desasignarUsuario_onClick(usuario.codigo)} />
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
                    <FontAwesomeIcon icon={faLink} onClick={() => asignarProducto_onClick(producto.codigo)} />
                ) : (
                    <FontAwesomeIcon icon={faLinkSlash} onClick={() => desasignarProducto_onClick(producto.codigo)} />
                )}
            </th>
        </tr>
    )

    // ACIONES
    const guardarOnClick = () => {
        const tiendaAux = {direccion, ciudad, provincia, estado};
        console.table(tiendaAux);
    };

    const asignarUsuario_onClick = (usuarioID) => {
        alert('asignar Usuario ' + usuarioID);
        // Crear asignación
        actualizarUsuarios();
    };
    const desasignarUsuario_onClick = (usuarioID) => {
        alert('desasignar Usuario ' + usuarioID);
        // Eliminar asignación
        actualizarUsuarios();
    }

    const asignarProducto_onClick = (productoID) => {
        // Crear asignación
        actualizarProductos();
    };
    const desasignarProducto_onClick = (productoID) => {
        // Eliminar asignación
        actualizarProductos();
    };

    const actualizarUsuarios = () => {
        // Actualizar asignación
        // Actualizar no asignados
    };

    const actualizarProductos = () => {
        // Actualizar asignación
        // Actualizar no asignados
    };

    return (
        <div>
            <h1>
                <FontAwesomeIcon icon={faShop} />
                <span>{tiendaID}</span>
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
                                        <th>Usuaio</th>
                                        <th className={styles.columna_accion}></th>
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
                                        <th>Producto</th>
                                        <th>Talle</th>
                                        <th>Color</th>
                                        <th className={styles.columna_accion}></th>
                                    </thead>
                                    <tbody>
                                        {productosNoAsociados.map((usuario, index) => (
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
                            <th>Talle</th>
                            <th>Color</th>
                            <th className={styles.columna_accion}></th>
                        </thead>
                        <tbody>
                            {productosAsociados.map((usuario, index) => (
                                <ItemUsuario key={index} usuario={usuario} asignar={false} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetalleTienda