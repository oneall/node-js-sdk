'use strict';

/**
* Send a GET request to this resource to retrieve a list of configured providers.
* @param  {Function} callback       the callback function
*/
function getAll(callback) {
    this.api.get('providers', null, {}, function (error, result) {
        this.api.retrieveData(error, result, 'providers', callback);
    }.bind(this));
}

module.exports = {
    getAll: getAll
};
