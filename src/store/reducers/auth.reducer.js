import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth.action';

// Definir el estado inicial del reducer
const initialState = {
    isAuthenticated: false,
    nombre: null,
    rol: null,
    idUsuario: null
    // token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                nombre: action.nombre,
                rol: action.rol,
                idUsuario: action.idUsuario
            };
        case LOGIN_FAILURE:
            // sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                nombre: null,
                idUsuario: null
            };
        case LOGOUT:
            // sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                nombre: null,
                idUsuario: null
            };
        default:
            return state;
    }
};

export default authReducer;