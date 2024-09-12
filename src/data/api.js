const API_URL = 'http://localhost:8000/'

export const API_TIENDA = {
    ALTA: API_URL + 'tienda/alta',
    LISTADO: API_URL + 'tiendas/listado',
    // GET_BY_ID: (id) => API_URL + `dispositivos/estacionamiento/${id}`,
}

export const API_AUTH = {
    LOGIN: API_URL + 'auth/login',
    ROLES: ['ROLE_TIENDA','ROLE_CASA_CENTRAL']
}