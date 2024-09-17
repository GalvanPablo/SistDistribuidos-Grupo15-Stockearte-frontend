const API_URL = 'http://localhost:8000/'

export const API_TIENDA = {
    ALTA: API_URL + 'tienda/alta',
    LISTADO: (codigo, habilitado) => API_URL + `tiendas/listado?codigo=${codigo}&habilitado=${habilitado}`,
    OBTENER: (id) => API_URL + `tienda/${id}/detalle`,
}

export const API_PRODUCTO = {
    ALTA: API_URL + 'producto/alta',
    LISTADO: (UsuarioID) => API_URL + `producto/listado/${UsuarioID}`,
    //LISTADO: (codigo, nombre, talle, color) => API_URL + `productos/listado?codigo=${codigo}&nombre=${nombre}&talle=${talle}&color=${color}`,
    //OBTENER: (ProductoID) => API_URL + `producto/${ProductoID}/detalle`,
    //MODIFICAR: (ProductoID) => API_URL + `producto/${ProductoID}/modificar`,
    //BAJA: (ProductoID) => API_URL + `producto/${ProductoID}/baja`,
}

export const API_USUARIO = {
    ALTA: API_URL + 'usuario/alta',
    LISTADO: (nombre, codigo) => API_URL + `usuarios/listado?nombre=${nombre}&codigo=${codigo}`, //usuarios o usuario
    OBTENER: (id) => API_URL + `usuario/${id}/detalle`,
}

export const API_AUTH = {
    LOGIN: API_URL + 'auth/login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
}