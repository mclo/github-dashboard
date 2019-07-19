import {
    ERROR,
    CLEAR_ERROR
} from './errorActions'


export const error = (state={}, action) => {
    switch(action.type) {
            case ERROR:
            return {
                ...state,
                code: action.code
            }
            case CLEAR_ERROR:
            return {
                ...state,
                code: action.code
            }
            default:
                return state
    }
}