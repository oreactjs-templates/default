import httpStatus from 'http-status';
import util from 'util';

function APIError (message, status = httpStatus.INTERNAL_SERVER_ERROR, extra = null){
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.extra = extra;
}

util.inherits(APIError, Error);
export default APIError;
