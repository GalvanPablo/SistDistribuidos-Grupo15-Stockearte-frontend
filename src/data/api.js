const API_URL = 'http://localhost:8000/'

export const API_TIENDA = {
    ALTA: API_URL + 'tienda/alta',
    LISTADO: (codigo, habilitado) => API_URL + `tiendas/listado?codigo=${codigo}&habilitado=${habilitado}`,
    // GET_BY_ID: (id) => API_URL + `dispositivos/estacionamiento/${id}`,
}

export const API_PRODUCTO = {
    ALTA: API_URL + 'producto/alta',
    LISTADO: (UsuarioID ) => API_URL + `producto/listado/${UsuarioID}`,
}

export const API_USUARIO = {
    ALTA: API_URL + 'usuario/alta',
    LISTADO: (nombre, tienda, habilitado) => API_URL + 
    `usuarios/listado?nombre=${nombre}&tienda=${tienda}&habilitado=${habilitado}`, //usuarios o usuario
}

export const API_AUTH = {
    LOGIN: API_URL + 'auth/login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
}