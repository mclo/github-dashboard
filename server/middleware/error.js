let model = require('../resources/model').model

const errorMiddleware = (err, req, res, next) => {
    res.json(response(res))
}

const response = (res) => {
    switch(res.status){
        case 400:
        return {
           message: 'request format is incorrect' 
        }
        case 401:
        return {
           message: 'User is not authenticated',
           next: model.login 
        }
        case 403:
        return {
           message: 'Not allowed',
           next: model.login 
        }
        case 404:
        return {
           message: 'Resource not found',
           next: model.login 
        }
        default: 
            return {
                message: 'internal server error'
            }
    }
}

module.exports  = errorMiddleware