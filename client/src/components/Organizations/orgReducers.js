import {
    ORGS_FETCHED,
    ORGS_REQUESTED
} from './orgActions'



const organizations = (state={}, action) => {
    switch(action.type) {
        case ORGS_REQUESTED:
            return {
                ...state,
                loading: action.loading
            }
        case ORGS_FETCHED:
            return { 
                ...state, 
                data: action.orgs,
                loading: action.loading
            }
        default: 
            return state
    }
}



export {
    organizations
}