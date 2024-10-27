import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faFilePdf, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './Catalogo.module.css'
import { Link, Navigate } from 'react-router-dom'
import { ModalGeneric, TextInput } from '../../components'
import { useSelector } from 'react-redux'
import { API_CATALOGO } from '../../../data/api'

const Catalogo = () => {
    const idUsuario = useSelector(state => state.auth.idUsuario);

    const [catalogos, setCatalogos] = useState([])
    const [catalogoCreado, setCatalogoCreado] = useState(null);
    const [nombreCatalogo, setNombreCatalogo] = useState('');

    useEffect(() => {
        obtenerCatalogos();
    }, [])

    const obtenerCatalogos = () => {
        fetch(API_CATALOGO.LISTADO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario }),
        })
            .then(response => response.json())
            .then(response => {
                setCatalogos(response.catalogo)
            })
    }

    const crearCatalogo = () => {
        alert(`Creando catalogo: ${nombreCatalogo}`);
        const catalogo = {
            titulo: nombreCatalogo,
            idUsuario // Para que sepa de que tienda es
        }

        fetch(API_CATALOGO.ALTA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catalogo),
        })
            .then(response => response.json())
            .then(response => {
                if (!isNaN(response.idCatalogo)) {
                    setCatalogoCreado(response.idCatalogo);
                } else {
                    alert(response.mensaje);
                }
            })
    }

    const descargarPdf = (idCatalogo) => {
        fetch(API_CATALOGO.EXPORTAR.PDF, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCatalogo
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.archivoPdf) {
                    const archivoPdfBase64 = data.archivoPdf;
                    const byteCharacters = atob(archivoPdfBase64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });

                    // Crea un URL temporal para el Blob
                    const blobUrl = URL.createObjectURL(blob);

                    // Abre una nueva ventana con el PDF
                    window.open(blobUrl, '_blank');
                } else if(data.mensaje) {
                    alert(data.mensaje);
                } else {
                    alert('Error al exportar el PDF');
                }
            })
    }

    const eliminarCatalogo = (idCatalogo) => {
        fetch(API_CATALOGO.ELIMINAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idCatalogo }),
        })
            .then(response => response.json())
            .then(response => {
                obtenerCatalogos();
            })
    }

    const [modalOpen, setModalOpen] = useState(false);
    const onCloseModal = () => {
        setNombreCatalogo('');
        setModalOpen(false);
    };

    const ItemCatalogo = ({ catalogo }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{catalogo.titulo}</td>
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