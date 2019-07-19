import {
    NEWS_FETCHED
} from './newsActions'



export const news = (state={}, action) => {
    switch(action.type){
        case NEWS_FETCHED:
            return {
                ...state, 
                all: action.all
            }
        default: return state
    }
}
