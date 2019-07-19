import {
    ISSUES_REQUESTED,
    ISSUES_FETCHED
} from './issueActions'

export const issues = (state={}, action) => {
    switch(action.type) {
        case ISSUES_REQUESTED:
            return {
                ...state,
                loading: action.loading
            }
        case ISSUES_FETCHED:
            return {
                ...state,
                data: action.issues,
                loading: action.loading
            }
        default: 
            return state
    }
}