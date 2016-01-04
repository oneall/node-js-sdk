'use strict';

/**
* Send a GET request to this resource to obtain the list of your users.
* @param {int} page                the page number
* @param  {Function} callback      the callback function
*/
function getAll (page, callback) {
    this.api.get('users', undefined, {page:page}, function (error, result) {
        this.api.retrieveData(error, result, 'users', callback);
    }.bind(this));
}

/**
* Send a GET request to this resource to retrieve the details of an existing user.
* @param  {string} userToken    the connection token that identifies the record
* @param  {Function} callback       the callback function
*/
function get (userToken, callback) {
    this.api.get('users/@token', userToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'user', callback);
    }.bind(this));
}

/**
* Send a GET request to the following resource to retrieve the social network contacts of an existing user.
* @param  {string} userToken        the connection token that identifies the user
* @param  {Object} options              optional to modify method behaviour
* @param  {Function} callback       the callback function
*/
function getContacts (userToken, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    this.api.get('users/@token/contacts', userToken, options, function (error, result) {
        this.api.retrieveData(error, result, 'identities', callback);
    }.bind(this));
}

/**
* Send a DELETE request to the following resource to delete an existing user.
* The user's profile and the attached social network identities will entirely be removed from your Site.
* @param  {string} userToken        the connection token that identifies the user
* @param  {Function} callback       the callback function
*/
function del (userToken, callback) {
    this.api.del('users/@token', userToken, {confirm_deletion: 'true'}, function (error, result) {
        this.api.retrieveData(error, result, 'message', callback);
    }.bind(this));
}

/**
* Send a POST request to this resource to publish content (posts, tweets ...) on the social network account of a user.
* Send a POST request to this resource to publish content on behalf of a user.
* @param  {string} userToken        the connection token that identifies the user
* @param  {string[]} providers      a list of social networks that will post this message
* @param  {Object}                  object with the message parts (json) the service accepts
* @param  {Function} callback       the callback function
*/
function publish(userToken, providers, parts, callback) {
    var postParams = {};
    postParams.providers = providers;
    postParams.parts = parts;
    this.api.post('users/@token/publish', userToken, {message: postParams}, function (error, result) {
        this.api.retrieveData(error, result, 'message', callback);
    }.bind(this));
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.getContacts = getContacts;
module.exports.del = del;
module.exports.publish = publish;
