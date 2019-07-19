const LOGGED_IN = 'LOGGED_IN'

export const setLogin = () => {
    setLoginStatus(true)
}

export const setLogout = () => {
    setLoginStatus(false)
}

export const getLoginStatus = () => {
    return localStorage.getItem(LOGGED_IN)
}

const setLoginStatus = (isLoggedIn) => {
    localStorage.setItem(LOGGED_IN, isLoggedIn)
}