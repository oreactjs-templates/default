import httpStatus from 'http-status';

// Handle api 404
const ApiHandleNotFound = (req, res, next) => {
    res.status(httpStatus.NOT_FOUND);
    res.json({
        'message': 'Requested resource not found'
    });
    res.end()
};

// handle errors
const handleError = (err, req, res, next) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        message: err.message,
        extra: err.extra,
        errors: err
    });
    res.end()
};


export default {
    ApiHandleNotFound: ApiHandleNotFound,
    handleError: handleError
}
