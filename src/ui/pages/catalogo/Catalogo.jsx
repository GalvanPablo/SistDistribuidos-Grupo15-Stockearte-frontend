import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faFilePdf, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './Catalogo.module.css'
import { Link, Navigate } from 'react-router-dom'
import { ModalGeneric, TextInput } from '../../components'
import { useSelector } from 'react-redux'
const Catalogo = () => {
    const idUsuario = useSelector(state => state.auth.idUsuario);

    const [catalogos, setCatalogos] = useState([])
    const [catalogoCreado, setCatalogoCreado] = useState(null);
    const [nombreCatalogo, setNombreCatalogo] = useState('');

    useEffect(() => {
        setCatalogos([
            { idCatalogo: 1, nombre: 'Remeras' },
            { idCatalogo: 2, nombre: 'Camperas' },
            { idCatalogo: 3, nombre: 'Pantalones' },
            { idCatalogo: 4, nombre: 'Buzos' },
        ])
    }, [])

    const crearCatalogo = () => {
        alert(`Creando catalogo: ${nombreCatalogo}`);
        const catalogo = {
            idUsuario, // Para que sepa de que tienda es
            nombre: nombreCatalogo
        }

        //TODO HACER EL FECTCH Y QUE DEVUELVA EL idCatalogo
        setCatalogoCreado(2);
    }

    const descargarPdf = (idCatalogo) => {
        alert(`PDF idCatalogo: ${idCatalogo}`)
    }

    const eliminarCatalogo = (idCatalogo) => {
        alert(`Eliminar idCatalogo: ${idCatalogo}`)
    }

    const [modalOpen, setModalOpen] = useState(false);
    const onCloseModal = () => {
        setNombreCatalogo('');
        setModalOpen(false);
    };

    const ItemCatalogo = ({ catalogo }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{catalogo.nombre}</td>
                <td className={styles.celdaAcciones}>
                    <button className={styles.btnAccion} title='Descargar pdf' onClick={() => { descargarPdf(catalogo.idCatalogo) }}>
                        <FontAwesomeIcon icon={faFilePdf} />
                    </button>
                    <Link to={`/catalogo/detalle/${catalogo.idCatalogo}`} className={styles.btnAccion} title='Editar'>
                        <FontAwesomeIcon icon={faFilePen} />
                    </Link>
                    <button className={styles.btnAccion} title='Eliminar' onClick={() => { eliminarCatalogo(catalogo.idCatalogo) }}>
                        <FontAwesomeIcon icon={faFileCircleXmark} />
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <>
            {catalogoCreado && <Navigate to={`/catalogo/detalle/${catalogoCreado}`} />}
            <h1>Catalogos</h1>
            <div className={styles.listado}>
                <div className={styles.toolbar}>
                    <button className={styles.nuevo} onClick={() => setModalOpen(true)}>Nuevo Catalogo</button>
                </div>
                <table className={styles.tabla}>
                    <thead className={styles.tabla__encabezado}>
                        <tr>
                            <th>Nombre</th>
                            <th className={styles.columna_acciones} style={{ textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {catalogos.map((catalogo, index) => (
                            <ItemCatalogo
                                key={index}
                                catalogo={catalogo}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalGeneric isOpen={modalOpen} onClose={onCloseModal} showCloseButton={false}>
                <div className={styles.crearCatalogo}>
                    <div>
                        <h3>Nuevo Catálogo</h3>
                        <TextInput
                            label={"Nombre"}
                            onChange={(value) => setNombreCatalogo(value)}
                        />
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.btnAceptar} onClick={crearCatalogo} disabled={nombreCatalogo.length === 0}>Crear catálogo</button>
                        <button className={styles.btnCancelar} onClick={onCloseModal}>Cancelar</button>
                    </div>
                </div>
            </ModalGeneric>
        </>
    )
}

export default Catalogo