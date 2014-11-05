'use strict';

/**
* Send a POST request to this resource to publish content (posts, tweets ...) on the social network account of a user.
* Send a POST request to this resource to publish content on behalf of a user.
* @param  {string} userToken        the user token that identifies the user
* @param  {string[]} providers      a list of social networks that will post this message
* @param  {Object}                  object with the message parts (json) the service accepts
* @param  {Function} callback       the callback function
*/
function publish(userToken, providers, parts, callback) {
    var postParams = {
                publish_for_user: {
                user_token: userToken,
                providers: providers
            },
            parts: parts
        };
    this.api.post('sharing/messages', null, {sharing_message: postParams}, function (error, result) {
        //that.api.retrieveData(error, result, 'message', callback);
        callback(error, result);
    });
}

/**
* Send a POST request to this resource to publish a previously published message to other social networks.
* @param  {string} userToken        the user token that identifies the user
* @param  {string[]} providers      a list of social networks that will post this message
* @param  {Function} callback       the callback function
* TODO check if the message is retrieve correctly.
*/
function rePublish (messageToken, userToken, providers, callback) {
    var postParams = {};
    postParams = {
        publish_for_user: {
            user_token: userToken,
            providers: providers
        }
    };
    this.api.post('sharing/messages/@token', messageToken, {sharing_message: postParams}, function (error, result) {
        this.api.retrieveData(error, result, 'message', callback);
    }.bind(this));
}

/**
 * Send a GET   request to this resource to retrieve the complete list of published messages.
 * @param  {int} page                the page number
 * @param  {Function} callback       the callback function
 */
function getAll (page, callback) {
    this.api.get('sharing/messages', null, {page: page}, function (error, result) {
        this.api.retrieveData(error, result, 'sharing_messages', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to retrieve the details of a previously published message.
 * @param  {string}   sharingMessageToken the token that identifies the record
 * @param  {Function} callback            the callback function
 */
function get (sharingMessageToken, callback) {
    this.api.get('sharing/messages/@token', sharingMessageToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'sharing_message', callback);
    }.bind(this));
}

/**
 * Send a DELETE request to this resource to permanently delete an existing sharing message.
 * Please note that the message will not be removed from the social networks.
 * @param  {string}   sharingMessageToken the token that identifies the record
 * @param  {Function} callback            the callback function
 */
function del (sharingMessageToken, callback) {
    this.api.del('sharing/messages/@token', sharingMessageToken, {confirm_deletion: 'true'}, function (error, result) {
        this.api.retrieveData(error, result, 'sharing_message', callback);
    }.bind(this));
}

module.exports.publish = publish;
module.exports.rePublish = rePublish;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.del = del;
