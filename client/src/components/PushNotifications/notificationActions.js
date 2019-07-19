import { 
    activateNotificationsAndSendToServer,
    activateNotifications,
    activateOnMessage
} from './firebase'
import {
    getApi
} from '../../localStorage/api'


export const activateAndSaveToken = (dispatch) => {
    const url = getApi().notifications
    
    activateNotificationsAndSendToServer(url)
    .then(() => activateOnMessage(dispatch)) 
    .then(() => dispatch(notificationsActive()))
    .catch(e => dispatch(notificationsDisabled()))
}

export const activate = (dispatch) => {
    const url = getApi().notifications
    
    activateNotifications(url)
    .then(() => activateOnMessage(dispatch)) 
    .then(() => dispatch(notificationsActive()))
    .catch(e => dispatch(notificationsDisabled()))
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const messageReceived = (payload) => {
    return {
        type: MESSAGE_RECEIVED,
        message: payload
    }
}


export const NOTIFICATIONS_ACTIVE = 'NOTIFICATIONS_ACTIVE'
const notificationsActive = () => {
    return {
        type: NOTIFICATIONS_ACTIVE,
        activated: true
    }
}

export const NOTIFICATIONS_DISABLED = 'NOTIFICTIONS_DISABLED'
const notificationsDisabled = () => {
    return {
        type: NOTIFICATIONS_DISABLED,
        activated: false
    }
}
