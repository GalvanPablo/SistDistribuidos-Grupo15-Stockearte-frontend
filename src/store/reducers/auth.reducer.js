import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth.action';

// Definir el estado inicial del reducer
const initialState = {
    isAuthenticated: false,
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
            // sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
            };
        case LOGOUT:
            // sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;