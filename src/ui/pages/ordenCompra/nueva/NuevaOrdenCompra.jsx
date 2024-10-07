import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux';
import { API_PRODUCTO, API_TIENDA } from './../../../../data/api';

import { ModalGeneric } from '../../../components';

import styles from './NuevaOrdenCompra.module.css'
const NuevaOrdenCompra = () => {
    const idUsuario = useSelector(state => state.auth.idUsuario);

    const [productos, setProductos] = useState([])
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    useEffect(() => {
        obtenerProductos();
        setProductosSeleccionados([]);
    }, [])

    useEffect(() => {
        if (productos.length === 0) {
            onCloseModal();
        }
    }, [productos])


    const obtenerProductos = () => {
        const filtros = {
            idUsuario
        }

        fetch(API_PRODUCTO.LISTADO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtros),
        })
            .then(response => response.json())
            .then(response => {
                setProductos(response.productos);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    const asignarProducto = (idProducto) => {
        const productoAsignado = productos.find((producto) => producto.idProducto === idProducto);
        if (productoAsignado) {
            const nuevoProducto = { ...productoAsignado, cantidad: 1 };
            setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
            setProductos(productos.filter((producto) => producto.idProducto !== idProducto));
        }
    };

    const desasignarProducto = (idProducto) => {
        const productoDesasignado = productosSeleccionados.find((producto) => producto.idProducto === idProducto);
        if (productoDesasignado) {
            setProductos([...productos, productoDesasignado]);
            setProductosSeleccionados(productosSeleccionados.filter((producto) => producto.idProducto !== idProducto));
        }
    };

    const actualizarCantidad = (idProducto, cantidad) => {
        setProductosSeleccionados(
            productosSeleccionados.map((producto) =>
                producto.idProducto === idProducto ? { ...producto, cantidad: parseInt(cantidad) } : producto
            )
        );
    };

    const crearOrdenCompra = () => {
        const orden = {
            idUsuario,
            items: productosSeleccionados.map((producto) => ({
                idProducto: producto.idProducto,
                cantidad: producto.cantidad,
            })),
        };

        fetch(API_TIENDA.AGREGAR_ORDEN_COMPRA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orden),
        })
            .then(response => {
                if (!response.ok) {
                    response.text().then(text => {
                        alert(`ERROR: ${response.status}\n${text}`);
                    });
                } else {
                    response.json();
                    setFinalizado(true)
                }
            })

        if (orden.items.length > 0) {
            console.log(orden);
        } else {
            alert("No hay productos válidos para crear la orden");
        }
    };

    const [finalizado, setFinalizado] = React.useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        if (productos.length > 0) {
            setModalOpen(true);
        } else {
            alert(productosSeleccionados.length > 0 ? 'No hay mas productos para agregar' : 'No se han encontrado productos asociados a la tienda');
        }
    }
    const onCloseModal = () => {
        setModalOpen(false);
    };

    const ItemProductoSeleccionado = ({ producto }) => {
        return (
            <tr className={styles.tabla__fila}>
                {/* <td>{producto.codigo}</td> */}
                <td>{producto.nombre}</td>
                <td>{producto.talle}</td>
                <td>{producto.color}</td>
                <td>
                    <input
                        type="number"
                        name={`${producto.codigo}_cantidad`}
                        id={`${producto.codigo}_cantidad`}
                        min={1}
                        step={1}
                        defaultValue={producto.cantidad}
                        onChange={(e) => actualizarCantidad(producto.idProducto, e.target.value)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                    <button className={styles.btnEliminar} onClick={() => desasignarProducto(producto.idProducto)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </td>
            </tr>
        );
    };

    const ItemProductoASeleccionar = ({ producto }) => {
        return (
            <tr className={styles.tabla__fila}>
                {/* <td>{producto.codigo}</td> */}
                <td>{producto.nombre}</td>
                <td>{producto.talle}</td>
                <td>{producto.color}</td>
                <td style={{ textAlign: 'center' }}>
                    <button className={styles.btnAsignarProducto} onClick={() => asignarProducto(producto.idProducto)}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <>
            <div>
                <h1>
                    <FontAwesomeIcon icon={faFileLines} />
                    <span>Orden de Compra</span>
                </h1>
                {finalizado && <Navigate to={"/ordenesDeCompra"} />}
            </div>
            <div className={styles.detalle_ordenCompra}>
                <div className={styles.orden_interactuar}>
                    <h2>Productos a solicitar</h2>
                    <button className={styles.btnAgregarProducto} onClick={openModal}>Agregar Producto</button>
                </div>
                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            {/* <th className={styles.columna_codigo}>Código</th> */}
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Cantidad</th>
                            <th className={styles.columna_acciones} style={{ textAlign: 'center' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {productosSeleccionados.map((producto, index) => (
                            <ItemProductoSeleccionado
                                key={index}
                                producto={producto}
                            />
                        ))}
                    </tbody>
                </table>
                <button className={styles.btnFinalizar} onClick={crearOrdenCompra}>Finalizar Orden de Compra</button>


                <ModalGeneric isOpen={modalOpen} onClose={onCloseModal}>
                    <div className={styles.modal_novedad_encabezado}>
                        <div className={styles.modal_novedad_info}>
                            <h2>Listado de Productos</h2>
                        </div>
                    </div>
                    <div className={styles.modal_novedad_body}>
                        <table className={styles.tabla}>
                            <thead className={styles.tabla_encabezado}>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Talle</th>
                                    <th>Color</th>
                                    <th>Agregar</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tabla__cuerpo}>
                                {productos.map((producto, index) => (
                                    <ItemProductoASeleccionar
                                        key={index}
                                        producto={producto}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ModalGeneric>
            </div>
        </>
    )
}

export default NuevaOrdenCompra