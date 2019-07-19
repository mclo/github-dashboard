import {
    API_FETCHED
} from './NavBarActions'



export const navigation = (state={}, action) => {
    switch(action.type){
        case API_FETCHED:
            return {
                ...state, 
                api: action.api
            }
        default: return state
    }
}
