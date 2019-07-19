
export const ERROR = 'ERROR'
export const clearErrorAndRedirectToLogin = (dispatch) => {
    dispatch(clearError())
    window.location = '/'
}

export const handleError = (code) => {
    return {
        type: ERROR,
        code: code
    }
}

export const CLEAR_ERROR = 'CLEAR_ERROR'
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
        code: null
    }
}