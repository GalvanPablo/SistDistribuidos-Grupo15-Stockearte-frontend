export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// ACA ES DONDE TENDRÍA QUE ESTAR EL CONSUMO A LA API DE AUTHENTIFICACIÓN
export const login = (username, password) => async (dispatch) => {

    if(username === '1234@correo.com' && password === '1234'){
        dispatch({
            type: LOGIN_SUCCESS
        });
    } else {
        dispatch({
            type: LOGIN_FAILURE,
        });
    }
};

export const logout = () => ({
    type: LOGOUT
});