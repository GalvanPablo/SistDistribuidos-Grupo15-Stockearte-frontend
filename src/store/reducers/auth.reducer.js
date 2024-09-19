import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth.action';

// Definir el estado inicial del reducer
let initialState = {
    isAuthenticated: false,
    nombre: null,
    rol: null,
    idUsuario: null
};

const persistedState = JSON.parse(localStorage.getItem('authData'));

if (persistedState) {
    initialState = {
        isAuthenticated: persistedState.isAuthenticated,
        nombre: persistedState.nombre,
        rol: persistedState.rol,
        idUsuario: persistedState.idUsuario
    };
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('authData', JSON.stringify({
                isAuthenticated: true,
                nombre: action.nombre,
                rol: action.rol,
                idUsuario: action.idUsuario
            }));
            return {
                ...state,
                isAuthenticated: true,
                nombre: action.nombre,
                rol: action.rol,
                idUsuario: action.idUsuario
            };
        case LOGIN_FAILURE:
            localStorage.removeItem('authData');
            return {
                ...state,
                isAuthenticated: false,
                nombre: null,
                idUsuario: null
            };
        case LOGOUT:
            localStorage.removeItem('authData');
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