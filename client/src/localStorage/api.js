const API = 'API'

export const setApi = (api) => {
    let apiJson = JSON.stringify(api)
    localStorage.setItem(API, apiJson)
}

export const getApi = () => {
    return JSON.parse(localStorage.getItem(API));
}


