import {
    LOGIN_REQUESTED,
    LOGGED_IN,
    LOGGED_OUT
} from './loginActions'


export const login = (state={}, action) => {
    switch(action.type) {
        case LOGIN_REQUESTED:
            return {
                ...state,
                loading: action.loading
            }
        case LOGGED_IN:
            return {
                ...state, 
                user: action.user,
                loading: action.loading
            }
        case LOGGED_OUT:
            return {
                ...state, 
                user: action.user,
                loading: action.loading
            }
        default: 
            return state;
    }
}