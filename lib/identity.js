'use strict';

/**
 Send a PUT request to this resource to synchronize an identity with the underlying social network profile.
 * @param {int} page                the page number
 * @param  {Function} callback      the callback function
 */
function synchronize(token, callback) {
    this.api.put('identities/@token/synchronize', token, {}, function (error, result) {
        this.api.retrieveData(error, result, 'identity', callback);
    }.bind(this));
}

/**
* Send a GET request to this resource to retrieve the details of an identity.
* @param  {string} identityToken  the identity token that identifies the record
* @param  {Function} callback       the callback function
*/
function get(identityToken, callback) {
    this.api.get('identities/@token', identityToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'identity', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to obtain the complete list of your identities.
 * @param {int} page                the page number
 * @param  {Function} callback      the callback function
 */
function getAll(page, callback) {
    this.api.get('connections', null, {page: page}, function (error, result) {
        this.api.retrieveData(error, result, 'connections', callback);
    }.bind(this));

}

/**
* Send a DELETE request to this resource in order to delete an identity.
* @param  {string} identityToken        the identity token that identifies the social user
* @param  {Function} callback           the callback function
*/
function del (identityToken, callback) {
    this.api.del('users/@token', identityToken, {confirm_deletion: 'true'}, function (error, result) {
        this.api.retrieveData(error, result, 'identity', callback);
    }.bind(this));
}

/**
* Send a PUT request to this resource to link an identity to another user.
* @param  {string} userToken        the user token that identifies the user
* @param  {string[]} providers      a list of social networks that will post this message
* @param  {Object}                  object with the message parts (json) the service accepts
* @param  {Function} callback       the callback function
*/
function reLink(identityToken, userToken, callback) {
    var postParams = {
            user: {
                user_token: userToken
            }
        };
    this.api.post('identities/@token/link.json', identityToken, postParams, function (error, result) {
        //that.api.retrieveData(error, result, 'message', callback);
        callback(error, result);
    });
}

module.exports = {
    synchronize: synchronize,
    get: get,
    del: del
};
