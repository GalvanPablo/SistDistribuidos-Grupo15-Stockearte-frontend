const API_URL = 'https://localhost:7035/'

export const API_TIENDA = {
    ALTA: API_URL + 'Tienda/CrearTienda',
    LISTADO: API_URL + 'Tienda/TraerTiendas',
    OBTENER: API_URL + 'Tienda/DetalleTiendas',
    MODIFICAR: API_URL + 'Tienda/ModificarTienda',
    //BAJA: API_URL + 'Tienda/EliminarTienda',

    USUARIO_ASIGNAR: API_URL + 'Tienda/AsignarUsuario',
    USUARIO_DESASIGNAR: API_URL + 'Tienda/DesasignarUsuario',

    PRODUCTO_ASGINAR: API_URL + 'Tienda/AsignarProducto',
    PRODUCTO_DESASGINAR: API_URL + 'Tienda/DesasignarProducto'
}

export const API_PRODUCTO = {
    ALTA: API_URL + 'Producto/CrearProducto',
    LISTADO: API_URL + 'Producto/TraerProducto',
    OBTENER: API_URL + 'Producto/Detalle',
    MODIFICAR: API_URL + 'Producto/ModificarProducto',
    //BAJA: API_URL + 'Producto/EliminarProducto',

    NO_ASIGNADOS: API_URL + 'Producto/GetProductosNoAsociados',
    ASIGNADOS: API_URL + 'Producto/GetProductosAsociados',

    MODIFICAR_STOCK: API_URL + 'Tienda/ModificarStock',

    NOVEDADES: API_URL + 'Producto/GetNovedadesProducto',
    ALTA_NOVEDADES: API_URL + 'Producto/CrearProductos'
}

export const API_USUARIO = {
    ALTA: API_URL + 'Usuario/CrearUsuario',
    LISTADO: API_URL + 'Usuario/TraerUsuarios',
    OBTENER: API_URL + 'Usuario/Detalle',
    MODIFICAR: API_URL + 'Usuario/ModificarUsuario',
    //BAJA: API_URL + 'Usuario/EliminarUsuario',

    NO_ASIGNADOS: API_URL + 'Usuario/GetUsuariosNoAsignados',
    ASIGNADOS: API_URL + 'Usuario/GetUsuariosAsignados'
}

export const API_AUTH = {
    LOGIN: API_URL + 'Usuario/Login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
}