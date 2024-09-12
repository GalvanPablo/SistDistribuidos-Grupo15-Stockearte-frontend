const API_URL = 'http://localhost:8000/'

export const API_TIENDA = {
    ALTA: API_URL + 'tienda/alta',
    LISTADO: API_URL + 'tiendas/listado',
    // GET_BY_ID: (id) => API_URL + `dispositivos/estacionamiento/${id}`,
}

<<<<<<< HEAD
export const API_PRODUCTO = {
    ALTA: API_URL + 'producto/alta',
    LISTADO: API_URL + 'productos/listado',
    
=======
export const API_AUTH = {
    LOGIN: API_URL + 'auth/login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
>>>>>>> 8b0d4c1e428d1576f4a8ff28111de56eb76e1f26
}