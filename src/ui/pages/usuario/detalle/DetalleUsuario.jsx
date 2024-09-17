import React from 'react'

import styles from './DetalleUsuario.module.css'

import { useParams } from "react-router-dom"
import { TextInput, Modal } from '../../../components'
import SwitchSelector from "react-switch-selector";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons'

import { API_USUARIO } from '../../../../data/api';

const DetalleUsuario = () => {
    const detallesVisualizacion = useParams();
    const usuarioID = detallesVisualizacion.id;

    const [usuario, setUsuario] = React.useState({});

    React.useEffect(() => {
        // fetch(API_USUARIO.OBTENER(usuarioID), {
        fetch(API_USUARIO.OBTENER(1), { //! ESTO ESTA HARDCODEADO - EL ENDPOINT NO RECIBE EL CODIGO SINO EL ID DEL USUARIO, DEBE DE SER CAMBIADO
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
            .then(response => { setUsuario(response) })

        }, []);

     // ACCIONES
    const guardarOnClick = () => {

    };

    return (
        <div>
          <h1>
            <FontAwesomeIcon icon={faShop} />
            <span>{usuarioID}</span>
          </h1>
          <div>
          <form className={styles.form}>
              <TextInput
                  label={"Clave"}
              // onChange={(value) => setClave(value)}
              />
              <TextInput
                  label={"Nombre"}
              // onChange={(value) => setNombre(value)}
              />
              <TextInput
                  label={"Email"}
              // onChange={(value) => setEmail(value)}
              />
              <TextInput
                  label={"Rol"}
              // onChange={(value) => setRol(value)}
              />

              <div className={styles.input_estado}>
                  <label htmlFor="habilitada">Estado</label>
                  <select name="habilitada" id="habilitada">
                      <option value="1">Habilitada</option>
                      <option value="0">Deshabilitada</option>
                  </select>
              </div>

              <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                  Guardar
              </button>
          </form>
        </div>
      </div>
            
    )
}

export default DetalleUsuario