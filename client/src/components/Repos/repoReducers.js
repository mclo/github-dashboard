import {
    REPOS_REQUESTED,
    REPOS_FETCHED,
    REPO_SELECTED
} from './repoActions'


export const repos = (state={}, action) => {
    switch(action.type) {
        case REPOS_FETCHED: 
            return{
                ...state,
                data: action.repos,
                loading: action.loading
            }
        case REPOS_REQUESTED:
        return {
            ...state,
            loading: action.loading
        }
        case REPO_SELECTED:
        return {
            ...state,
            current: action.repo
        }
        default: 
            return state
    }
}