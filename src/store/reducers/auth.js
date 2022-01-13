import * as Actions from '../actions';

const initState = {
    token: localStorage.getItem('jwt_access_token'),
    currentUser: null,
    success: false,
    error: {
        email: null,
        password: null
    }
}

const auth = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_LOGOUT_USER:
            return { ...state, currentUser: null, token: null }
        case Actions.TYPE_SET_USER_DATA:
            const newstate = { ...state, currentUser: action.user };
            return newstate;
        case Actions.TYPE_LOGIN_SUCCESS:
            return { ...state, success: true }
        case Actions.TYPE_LOGIN_ERROR:
            console.log(action);
            return { ...state, success: false, error: { ...state.error, email: action.error.email, password: action.error.password } }
        default:
            return state;
    }
}

export default auth;