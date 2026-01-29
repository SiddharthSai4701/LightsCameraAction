const makeErrorResponse = (err = {}, message = 'Something went wrong') => {
    return {
        err: err,
        data: {},
        message: message,
        success: false
    }
}

const makeSuccessResponse = (data = {}, message = 'Successfully processed request') => {
    return {
        err: {},
        data: data,
        message: message,
        success: true
    }
}

module.exports = {
    makeErrorResponse,
    makeSuccessResponse
}
