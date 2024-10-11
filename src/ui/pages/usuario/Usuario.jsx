import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'

import styles from './Usuario.module.css'

import { Link } from 'react-router-dom'

import { API_USUARIO } from '../../../data/api'
import { ModalGeneric } from '../../components'

const Usuario = () => {

    const Item = ({ nombre, tienda, estado, id }) => (
        <tr className={styles.tabla__fila}>
            <td>{nombre}</td>
            <td>{tienda.codigo}</td>
            <td>{estado}</td>
            <td className={styles.tabla__celdaAciones}>
                <Link to={`/usuarios/usuario/${id}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles} />
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
                setUsuarios(response.usuarios);
            })
    };

    React.useEffect(() => {
        obtenerListado();
    }, [nombre, codigoTienda]); // BUSCAR EN CADA CAMBIO DE FILTRO

    const [modalOpen, setModalOpen] = React.useState(false);
    const onCloseModal = () => {
        setUsuariosImportar([]);
        setModalOpen(false);
    };

    const [usuariosImportar, setUsuariosImportar] = React.useState([]);

    const headers = ['email', 'clave', 'nombre', 'apellido', 'codigoTienda'];
    const inputFile_onChange = (e) => {
        const file = e.target.files[0];  // Obtiene el archivo del input
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const text = e.target.result;  // Lee el contenido del archivo como texto
                const lines = text.split('\n');  // Divide el contenido en líneas

                // Ignora la primera línea del archivo
                const dataLines = lines.slice(1);

                // Convertimos cada línea a un objeto
                const data = dataLines.map(line => {
                    const values = line.split(';').map(value => value.trim());  // Elimina \r y espacios extra
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index];
                    });
                    return obj;
                });

                setUsuariosImportar(data);
            };

            reader.onerror = function (error) {
                console.error("Error al leer el archivo:", error);
            };

            reader.readAsText(file);  // Lee el archivo como texto
        }
    }

    const importar_onClick = () => {
        alert('importando');
    }

    return (
        <>
            <h1>Usuarios</h1>
            <div className={styles.listado}>

                <div className={styles.toolbar}>
                    <div className={styles.btnNuevos}>
                        <Link to={`/usuarios/nueva`} className={styles.nuevo}>Nuevo Usuario</Link>
                        <button className={styles.nuevo} onClick={() => setModalOpen(true)}>
                            <span>Importar</span>
                        </button>
                    </div>
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Código de Tienda' onChange={(e) => setCodigoTienda(e.target.value)} />
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
                                estado={usuario.habilitado ? 'Habilitado' : 'Deshabilitado'}
                                id={usuario.idUsuario}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalGeneric isOpen={modalOpen} onClose={onCloseModal} showCloseButton={false}>
                <div className={styles.import__container}>
                    <h2>Importar Usuarios</h2>
                    <input type="file" id="fileInput" accept=".csv" onChange={inputFile_onChange} />
                    <table className={`${styles.tabla} ${styles.tabla__modal}`}>
                        <thead className={styles.tabla__encabezado}>
                            <tr>
                                <th>Email</th>
                                <th>Clave</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Tienda</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tabla__cuerpo}>
                            {usuariosImportar.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.clave}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.codigoTienda}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.importar__buttons}>
                        <button className={styles.btnImportarUsuarios} onClick={importar_onClick} disabled={!(usuariosImportar.length > 0)}>Importar</button>
                        <button className={styles.btnCancelarImportarUsuarios} onClick={onCloseModal}>Cancelar</button>
                    </div>
                </div>
            </ModalGeneric>
        </>
    )
}

export default Usuario