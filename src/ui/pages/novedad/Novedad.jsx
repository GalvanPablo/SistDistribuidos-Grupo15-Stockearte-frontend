import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { ModalGeneric } from '../../components';

import styles from './Novedad.module.css'
import { API_PRODUCTO } from '../../../data/api';
const Novedad = () => {

    const [novedades, setNovedades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [novedadSeleccionada, setNovedadSeleccionada] = useState({});
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        fetch(API_PRODUCTO.NOVEDADES, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(response => {
                setNovedades(response.novedades);
            })
    }, []);

    const agregar_onClick = (novedad) => {
        setModalOpen(true);
        setNovedadSeleccionada(novedad);
    };

    const onCloseModal = () => {
        setModalOpen(false);
        setNovedadSeleccionada({});
        setSeleccionados([]);
    };

    const handleCheckChange = (talle, color, checked) => {
        if (checked) {
            setSeleccionados((prevSeleccionados) => [...prevSeleccionados, { talle, color }]);
        } else {
            setSeleccionados((prevSeleccionados) => prevSeleccionados.filter((sel) => sel.talle !== talle || sel.color !== color));
        }
    };

    const handleAgregar = () => {
        const novedad = {
            codigo: novedadSeleccionada.codigo,
            nombre: novedadSeleccionada.nombre,
            url: novedadSeleccionada.url,
            habilitado: true,
            tallesColores: seleccionados
        }

        console.log(novedad);

        fetch(API_PRODUCTO.ALTA_NOVEDADES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({datosProducto: novedad}),
        })
            .then(response => {
                if (!response.ok) {
                    response.text().then(text => {
                        alert(`ERROR: ${response.status}\n${text}`);
                    });
                } else {
                    console.log(response.json());
                }
            })

        onCloseModal();
    };

    const Item = ({ novedad }) => {
        return (
            <div className={styles.novedad_container}>
                <div className={styles.novedad__img_container}>
                    <img src={novedad.url} alt={novedad.nombre} className={styles.novedad__img} />
                    <div className={styles.novedad__img_overlay}>
                        <span className={styles.novedad__codigo}>{novedad.codigo}</span>
                        <button className={styles.novedad__btnAgregar} title={novedad.nombre} onClick={() => { agregar_onClick(novedad) }}>
                            <FontAwesomeIcon icon={faTags} />
                            <span>{novedad.nombre}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <h1>Novedades</h1>
            <div className={styles.novedades__container}>
                {novedades.map((novedad, index) => (
                    <Item
                        key={index}
                        novedad={novedad}
                    />
                ))}
            </div>
            <ModalGeneric isOpen={modalOpen} onClose={onCloseModal}>
                <div className={styles.modal_novedad_encabezado}>
                    <div className={styles.modal_novedad_info}>
                        <h2>{novedadSeleccionada.nombre}</h2>
                        <span>{novedadSeleccionada.codigo}</span>
                    </div>
                    <button onClick={handleAgregar}>Agregar</button>
                </div>
                <div className={styles.modal_novedad_body}>
                    <table>
                        <thead>
                            <tr>
                                <th>Talle</th>
                                {Array.from(new Set(novedadSeleccionada.disponibilidad?.map((disp) => disp.color))).map((color, index) => (
                                    <th key={index}>{color}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(new Set(novedadSeleccionada.disponibilidad?.map((disp) => disp.talle))).map((talle, index) => (
                                <tr key={index}>
                                    <td>{talle}</td>
                                    {Array.from(new Set(novedadSeleccionada.disponibilidad?.map((disp) => disp.color))).map((color, index) => (
                                        <td key={index}>
                                            {
                                                novedadSeleccionada.disponibilidad?.some((disp) => disp.talle === talle && disp.color === color) ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={seleccionados.some((sel) => sel.talle === talle && sel.color === color)}
                                                        onChange={(e) => handleCheckChange(talle, color, e.target.checked)}
                                                        className={styles.moda_novedad_chk}
                                                    />
                                                ) : ''
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ModalGeneric>
        </>
    );
}

export default Novedad