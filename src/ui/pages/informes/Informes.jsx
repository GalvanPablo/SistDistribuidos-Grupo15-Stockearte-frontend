import React, { useEffect, useRef, useState } from 'react'

import styles from './Informes.module.css'
import { useSelector } from 'react-redux';
import { ModalGeneric, TextInput } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFilterCircleXmark, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { API_AUTH } from '../../../data/api';

const MOSTRAR = {
    FILTROS: 0,
    GUARDAR: 1,
}

const Informes = () => {
    const idUsuario = useSelector(state => state.auth.idUsuario);
    const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];

    const [informes, setInformes] = useState([]);

    const filtrosLimpios = { idFiltro: 0, codigoProducto: '', fechaDesde: '', fechaHasta: '', estado: '', codigoTienda: '' };
    const [filtroActual, setFiltroActual] = useState(filtrosLimpios);

    const [idFiltroSeleccionado, setIdFiltroSeleccionado] = useState(0);
    const [filtrosDisponibles, setFiltrosDisponibles] = useState([]);

    const [nombreFiltro, setNombreFiltro] = useState('');
    const [mostrarModal, setMostrarModal] = useState();

    //#region Manejo de Filtros
    const input_codigoProducto = useRef(null);
    const setCodigoProducto = (valor) => {
        setFiltroActual({ ...filtroActual, codigoProducto: valor });
    };
    const input_fechaDesde = useRef(null);
    const setFechaDesde = (valor) => {
        setFiltroActual({ ...filtroActual, fechaDesde: valor });
    };
    const input_fechaHasta = useRef(null);
    const setFechaHasta = (valor) => {
        setFiltroActual({ ...filtroActual, fechaHasta: valor });
    };
    const input_estado = useRef(null);
    const setEstado = (valor) => {
        setFiltroActual({ ...filtroActual, estado: valor });
    };
    const input_codigoTienda = useRef(null);
    const setCodigoTienda = (valor) => {
        setFiltroActual({ ...filtroActual, codigoTienda: valor });
    };
    //#endregion

    const btnLimpiarFiltros_onClick = () => {
        input_codigoProducto.current.value = '';
        input_fechaDesde.current.value = '';
        input_fechaHasta.current.value = '';
        input_estado.current.value = '';
        input_codigoTienda.current.value = '';
        setFiltroActual(filtrosLimpios);
        setIdFiltroSeleccionado(0);
    }

    useEffect(() => {
        console.clear();
        console.table(filtroActual); //TODO REVISAR COMO GESTIONAR LAS FECHAS PARA ENVIAR AL ENDPOINT
    }, [filtroActual]);

    useEffect(() => {
        traerFiltrosDisponibles();
    }, []);

    const traerFiltrosDisponibles = () => {
        setFiltrosDisponibles([
            { idFiltro: 1, nombre: 'Remeras', codigoProducto: 'REM', fechaDesde: '2023-12-10', fechaHasta: '2024-10-11', estado: 'ACEPTADA', codigoTienda: 'ABCD1234' },
            { idFiltro: 2, nombre: 'Jeans', codigoProducto: 'JEN', fechaDesde: '', fechaHasta: '', estado: 'RECHAZADA', codigoTienda: '' },
        ])
    }


    const [modalOpen, setModalOpen] = React.useState(false);
    const onCloseModal = () => {
        setModalOpen(false);
    };

    const aplicarFiltro = (idFiltro) => {
        setIdFiltroSeleccionado(idFiltro);
        const filt = filtrosDisponibles.find((obj) => obj.idFiltro === idFiltro);

        input_codigoProducto.current.value = filt.codigoProducto;
        input_fechaDesde.current.value = filt.fechaDesde;
        input_fechaHasta.current.value = filt.fechaHasta;
        input_estado.current.value = filt.estado;
        input_codigoTienda.current.value = filt.codigoTienda;

        setFiltroActual({
            idFiltro: filt.idFiltro,
            nombre: filt.nombre,
            codigoProducto: filt.codigoProducto,
            fechaDesde: filt.fechaDesde,
            fechaHasta: filt.fechaHasta,
            estado: filt.estado,
            codigoTienda: filt.codigoTienda
        });

        onCloseModal();
    }

    const eliminarFiltro = (idFiltro) => {
        alert(`Eliminando el filtro ${idFiltro}`);
    }

    const btnFiltros_onClick = () => {
        setMostrarModal(MOSTRAR.FILTROS);
        setModalOpen(true);
    }

    const btnGuardarFiltro_onClick = () => {
        setMostrarModal(MOSTRAR.GUARDAR);
        setNombreFiltro(filtroActual.nombre);
        setModalOpen(true);
    }

    const btnGuardar_onClick = () => {
        if (nombreFiltro && nombreFiltro.length !== 0) {
            const filt = filtrosDisponibles.find((obj) => obj.nombre === nombreFiltro);
            if (filt) {
                alert('Filtro existente');
            } else {
                alert('Aun no existe el filtro');
            }
        } else {
            alert('Debe de especificar un nombre de filtro')
        }
    }

    const Item = ({ informe }) => {
        return (
            <tr>
                <td>{informe.codigoProducto}</td>
                <td>{informe.codigoTienda}</td>
                <td>{informe.estado}</td>
                <td>{informe.cantidad}</td>
            </tr>
        );
    };

    const ItemFiltroDisponible = ({ filtro }) => {
        return (
            <div className={styles.itemFiltroDisponible}>
                <span>{filtro.nombre}</span>
                <div>
                    <button title='Aplicar filtro' onClick={() => aplicarFiltro(filtro.idFiltro)}>Aplicar</button>
                    <button title='Eliminar filtro' onClick={() => eliminarFiltro(filtro.idFiltro)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
        );
    };

    return (
        <>
            <h1>Informes</h1>
            <div className={styles.listado}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" placeholder='Codigo Producto' onChange={(e) => setCodigoProducto(e.target.value)} ref={input_codigoProducto} />
                        <input type="date" title='Fecha desde' onChange={(e) => setFechaDesde(e.target.valueAsDate)} ref={input_fechaDesde} />
                        <input type="date" title='Fecha hasta' onChange={(e) => setFechaHasta(e.target.valueAsDate)} ref={input_fechaHasta} />

                        <select onChange={(e) => setEstado(e.target.value)} ref={input_estado}>
                            <option value="">(Todas)</option>
                            <option value="RECIBIDA">Recibidas</option>
                            <option value="ACEPTADA">Aceptadas</option>
                            <option value="SOLICITADA">Solicitadas</option>
                            <option value="RECHAZADA">Rechazadas</option>
                        </select>
                        <input type="text" placeholder='Código Tienda' onChange={(e) => setCodigoTienda(e.target.value)} ref={input_codigoTienda} hidden={!deCentral} />
                    </div>
                    <div className={styles.btnGestionFiltros}>
                        <button title='Guardar filtro actual' onClick={btnGuardarFiltro_onClick}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                        <button title='Limpiar filtros' onClick={btnLimpiarFiltros_onClick}>
                            <FontAwesomeIcon icon={faFilterCircleXmark} />
                        </button>
                        <button title='Filtros disponibles' onClick={btnFiltros_onClick}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th>Código Producto</th>
                            <th>Código Tienda</th>
                            <th>Estado</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {informes.map((informe, index) => (
                            <Item
                                key={index}
                                informe={informe}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalGeneric isOpen={modalOpen} onClose={onCloseModal} showCloseButton={false}>
                <div hidden={mostrarModal !== MOSTRAR.FILTROS}>
                    <h3>Filtros disponibles</h3>
                    <div className={styles.filtrosDisponibles_container}>
                        {filtrosDisponibles.map((filtro, index) => (
                            <ItemFiltroDisponible
                                key={index}
                                filtro={filtro}
                            />
                        ))}
                    </div>
                </div>
                <div hidden={mostrarModal !== MOSTRAR.GUARDAR}>
                    <h3>Guardar Filtro</h3>
                    <TextInput
                        label={"Nombre"}
                        value={nombreFiltro}
                        onChange={(value) => setNombreFiltro(value)}
                    />
                    <div className={styles.btnGuardarCancelar}>
                        <button onClick={btnGuardar_onClick}>Guardar</button>
                        <button onClick={() => setModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            </ModalGeneric>
        </>
    )
}

export default Informes