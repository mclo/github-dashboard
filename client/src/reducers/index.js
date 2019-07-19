import { combineReducers } from 'redux'

import { navigation } from '../components/NavBar/NavBarReducers'
import { login } from '../components/Login/loginReducers'
import { organizations }   from '../components/Organizations/orgReducers' 
import { repos } from '../components/Repos/repoReducers'
import { subscription } from '../components/Subscription/subReducer'
import { issues } from '../components/Issues/issueRecuders'
import { notifications } from '../components/PushNotifications/notificationReducers'
import { error } from '../components/Error/errorReducer'
import { news } from '../components/News/newsReducer'

const rootReducer = combineReducers({
    login,
    navigation,
    organizations,
    repos,
    issues,
    notifications,
    subscription,
    error,
    news
})

export default rootReducer