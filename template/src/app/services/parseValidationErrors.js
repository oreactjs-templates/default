import _ from '@oreact/core/lodash';

export default (exception) => {
    let errors = {};
    if(exception._message === 'Validation failed' && exception.errors){
        _.map(exception.errors, (err, i) => { errors[i] = err.properties.message } );
    }
    return errors;
}
