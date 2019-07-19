import {
    SUBSCRIPTION_FETCHED,
    SUBSCRIPTION_EDITED,
    HOOK_DELETED,
    NO_PERMISSION
} from './subActions'


export const subscription = (state={}, action) => {
    switch(action.type) {
            case SUBSCRIPTION_EDITED:
            return {
                ...state,
                current: action.current,
                options: action.options,
                active: action.active,
                unauthorized: false
            }
            case SUBSCRIPTION_FETCHED:
            return {
                ...state,
                current: action.current,
                options: action.options,
                active: action.active,
                unauthorized: false
            }
            case HOOK_DELETED:
            return {
                ...state,
                active: action.active,
                options: action.options,
                current: action.current,
                unauthorized: false
            }
            case NO_PERMISSION:
            return {
                ...state,
                unauthorized: true
            }
            default:
                return state
    }
}