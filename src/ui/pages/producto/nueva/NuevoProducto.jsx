import React from "react";

import { TextInput } from '../../../components'

import { API_PRODUCTO } from '../../../../data/api'

import styles from './NuevoProducto.module.css'

const NuevoProducto = () => {
  const [codigo, setCodigo] = React.useState('');
  const [codigoError, setCodigoError] = React.useState(false);
  const [nombre, setNombre] = React.useState('');
  const [talle, setTalle] = React.useState('');
  const [color, setColor] = React.useState('');

  const guardarOnClick = () => {
      const producto = {
          codigo,
          nombre,
          talle,
          color,
      }

      console.log(API_PRODUCTO.ALTA);
      console.table(producto);

      fetch(API_PRODUCTO.ALTA, {
          method: 'POST',
          headers: {
              // 'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto),
      })
          .then(response => {
              if (!response.ok) {
                  response.text().then(text => {
                      alert(`ERROR: ${response.status}\n${text}`);
                      setCodigoError(true);
                  });
              } else {
                  response.json();
                  alert('PERFECTAMENTE EQUILIBRADO');
              }
          })
  };

  React.useEffect(()=>{
      setCodigoError(false);
  }, [codigo]);

  return (
      <div>
          <div className={styles.encabezado}>
              <h1>Nuevo Producto</h1>
          </div>
          <div>
              <form className={styles.form}>
                  <TextInput
                      label={"Código de Producto"}
                      helperText={"Código unico"}
                      onChange={setCodigo}
                      alfanumerico={true}
                      error={codigoError}
                      feedback={codigoError && 'El código ingresado ya esta en uso'}
                  />
                  <TextInput
                      label={"Nombre"}
                      onChange={(value) => setNombre(value)}
                  />
                  <TextInput
                      label={"Talle"}
                      onChange={(value) => setTalle(value)}
                  />
                  <TextInput
                      label={"Color"}
                      onChange={(value) => setColor(value)}
                  />
                  <button type="button" className={styles.btn_guardar} onClick={guardarOnClick}>
                      Guardar
                  </button>
              </form>
          </div>
      </div>
  )
}

export default NuevoProducto