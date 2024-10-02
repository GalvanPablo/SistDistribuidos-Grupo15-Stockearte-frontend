import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import styles from './Novedad.module.css'

const Novedad = () => {

    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        setNovedades([
            { codigo: 'AB13123', nombre: 'Remera', urlImagen: 'https://acdn.mitiendanube.com/stores/001/843/621/products/remera-mars-7c26d2c9fee69ac0e117038892666423-1024-1024.png' },
            { codigo: 'DF54362', nombre: 'Jean', urlImagen: 'https://www.jamessmart.com/home/wp-content/uploads/ART-25629-JEAN-5B-AZUL.jpg' },
            { codigo: 'YS55731', nombre: 'Campera deportiva hombre', urlImagen: 'https://d22fxaf9t8d39k.cloudfront.net/fef31e28d0c12e87e1a13f437ab4687c6642c4bf8080601fb42dec83d6ee602b276731.webp' },
            { codigo: 'YS55731', nombre: 'Campera deportiva hombre', urlImagen: 'https://d22fxaf9t8d39k.cloudfront.net/fef31e28d0c12e87e1a13f437ab4687c66c4bf8080601fb42dec83d6ee602b276731.webp' },
        ])
    }, []);

    const Item = ({ novedad }) => {
        return (
            <div className={styles.novedad_container}>
                <div className={styles.novedad__img_container}>
                    <img src={novedad.urlImagen} alt={novedad.nombre} className={styles.novedad__img} />
                    <div className={styles.novedad__img_overlay}>
                        <span className={styles.novedad__codigo}>{novedad.codigo}</span>
                        <button className={styles.novedad__btnAgregar} title={novedad.nombre}>
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
        </>
    );
}

export default Novedad