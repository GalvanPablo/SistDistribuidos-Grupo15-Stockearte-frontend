import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { ModalGeneric } from '../../components';

import styles from './Novedad.module.css'
const Novedad = () => {

    const [novedades, setNovedades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [novedadSeleccionada, setNovedadSeleccionada] = useState({});
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        setNovedades([
            {
                codigo: 'AB13123',
                nombre: 'Remera',
                url: 'https://acdn.mitiendanube.com/stores/001/843/621/products/remera-mars-7c26d2c9fee69ac0e117038892666423-1024-1024.png',
                disponibilidad: [
                    { talle: 'XL', color: 'Negro' },
                    { talle: 'XL', color: 'Azul' },
                    { talle: 'M', color: 'Azul' },
                ]
            },
            {
                codigo: 'DF54362',
                nombre: 'Jean',
                url: 'https://www.jamessmart.com/home/wp-content/uploads/ART-25629-JEAN-5B-AZUL.jpg',
                disponibilidad: [
                    { talle: 'XL', color: 'Negro' },
                    { talle: 'XL', color: 'Azul' },
                    { talle: 'XL', color: 'Verde' },
                    { talle: 'M', color: 'Negro' },
                    { talle: 'S', color: 'Azul' },
                ]
            },
            {
                codigo: 'YS55731', nombre: 'Campera deportiva hombre', url: 'https://d22fxaf9t8d39k.cloudfront.net/fef31e28d0c12e87e1a13f437ab4687c6642c4bf8080601fb42dec83d6ee602b276731.webp',
                disponibilidad: [
                    { talle: 'XL', color: 'Negro' },
                    { talle: 'XL', color: 'Azul' },
                    { talle: 'XL', color: 'Verde' },
                    { talle: 'M', color: 'Negro' },
                    { talle: 'S', color: 'Azul' },
                ]
            },
            {
                codigo: 'YS55731', nombre: 'Campera deportiva hombre', url: 'https://d22fxaf9t8d39k.cloudfront.net/fef31e28d0c12e87e1a13f437ab4687c66c4bf8080601fb42dec83d6ee602b276731.webp',
                disponibilidad: [
                    { talle: 'XL', color: 'Negro' },
                    { talle: 'XL', color: 'Azul' },
                    { talle: 'M', color: 'Azul' },
                ]
            },
        ])
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
            disponibilidad: seleccionados
        }

        console.log(novedad);
        // Aquí puedes agregar la lógica para agregar los seleccionados al carrito o donde sea necesario

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