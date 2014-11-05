'use strict';

/**
*
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
