const _ = require('lodash');

const formatGraphQlErrors = error => {
    const errorDetails = _.get(error, "originalError.response.body");
    try {
        if (errorDetails) return JSON.parse(errorDetails);
    } catch (e) {
        console.log('error:::> ', e);
    }

    return error;
}

module.exports = formatGraphQlErrors;