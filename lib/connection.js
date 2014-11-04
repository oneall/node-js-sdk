'use strict';

/**
 * Send a GET request to this resource to retrieve the complete list of social network connections made to your Site.
 * @param {int} page                the page number
 * @param  {Function} callback      the callback function
 */
function getAll(page, callback) {
    this.api.get('connections', undefined, {page: page}, function (error, result) {
        this.api.retrieveData(error, result, 'connections', callback);
    }.bind(this));
}

/**
* Send a GET request to this resource to retrieve the details of a social network connection made on your Site.
* @param  {string} connectionToken  the connection token that identifies the record
* @param  {Function} callback       the callback function
*/
function get(connectionToken, callback) {
    this.api.get('connections/@token', connectionToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'connection', callback);
    }.bind(this));
}


/**
* Send a GET request to this resource to retrieve the details of an existing user identity.
* @param  {string} connectionToken  the connection token that identifies the record
* @param  {Function} callback the callback function
*/
function getUser(connectionToken, callback) {
    this.api.get('connections/@token', connectionToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'user', callback);
    }.bind(this));
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.getUser = getUser;
