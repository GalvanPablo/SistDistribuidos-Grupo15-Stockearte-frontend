const API_URL = 'https://localhost:7035/'

export const API_TIENDA = {
    ALTA: API_URL + 'Tienda/CrearTienda',
    LISTADO: API_URL + 'Tienda/TraerTiendas',
    OBTENER: API_URL + 'Tienda/DetalleTiendas',
    MODIFICAR: API_URL + 'Tienda/ModificarTienda',

    USUARIO_ASIGNAR: API_URL + 'Tienda/AsignarUsuario',
    USUARIO_DESASIGNAR: API_URL + 'Tienda/DesasignarUsuario',

    PRODUCTO_ASGINAR: API_URL + 'Tienda/AsignarProducto',
    PRODUCTO_DESASGINAR: API_URL + 'Tienda/DesasignarProducto'
}

export const API_PRODUCTO = {
    ALTA: API_URL + 'producto/alta',
    LISTADO: (UsuarioID) => API_URL + `producto/listado/${UsuarioID}`,
    //LISTADO: (codigo, nombre, talle, color) => API_URL + `productos/listado?codigo=${codigo}&nombre=${nombre}&talle=${talle}&color=${color}`,
    //OBTENER: (ProductoID) => API_URL + `producto/${ProductoID}/detalle`,
    //MODIFICAR: (ProductoID) => API_URL + `producto/${ProductoID}/modificar`,
    //BAJA: (ProductoID) => API_URL + `producto/${ProductoID}/baja`,

    NO_ASIGNADOS: API_URL + 'Producto/GetProductosNoAsociados',
    ASIGNADOS: API_URL + 'Producto/GetProductosAsociados'
}

export const API_USUARIO = {
    ALTA: API_URL + 'usuario/alta',
    LISTADO: (nombre, codigo) => API_URL + `usuarios/listado?nombre=${nombre}&codigo=${codigo}`, //usuarios o usuario
    OBTENER: (id) => API_URL + `usuario/${id}/detalle`,

    NO_ASIGNADOS: API_URL + 'Usuario/GetUsuariosNoAsignados',
    ASIGNADOS: API_URL + 'Usuario/GetUsuariosAsignados'
}

export const API_AUTH = {
    LOGIN: API_URL + 'Usuario/Login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
}