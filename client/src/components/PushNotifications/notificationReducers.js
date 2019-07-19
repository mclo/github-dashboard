import {
    MESSAGE_RECEIVED,
    NOTIFICATIONS_ACTIVE,
    NOTIFICATIONS_DISABLED
} from './notificationActions'

//only triggered if page isn't refreshed after activating messages... 
//tested in firefox only as chrome blocks insecure https requests
export const notifications = (state={}, action) => {
    switch(action.type){
        case NOTIFICATIONS_ACTIVE || NOTIFICATIONS_DISABLED:
            return {
                ...state,
                activated: action.activated
            }
        case MESSAGE_RECEIVED:
            return {
                ...state,
                message: action.message
            }
        default: 
            return state;
    }
}