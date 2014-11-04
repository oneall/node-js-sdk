'use strict';

/**
 * Send a GET request to the following resource to retrieve the shortened urls for one of your Sites.
 * @param  {int} page                   the page number
 * @param  {Function} callback          the callback function
 */
function getAll(page, callback) {
    this.api.get('shorturls', undefined, {page: page}, function (error, result) {
        this.api.retrieveData(error, result, 'shorturls', callback);
    }.bind(this));
}

/**
 * Send a GET request to the following resource to retrieve the details of an existing Shorturl.
 * @param  {[string]}   shorturlToken   the token that identifies the record
 * @param  {Function} callback          the callback function
 */
function get(shorturlToken, callback) {
    this.api.get('shorturls/@token', shorturlToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'shorturl', callback);
    }.bind(this));
}

/**
 * Send a DELETE request to the following resource to delete an existing Shorturl.
 * @param  {[string]}   shorturlToken   the token that identifies the record
 * @param  {Function} callback          the callback function
 */
function del(shorturlToken, callback) {
    this.api.del('shorturls/@token', shorturlToken, {confirm_deletion: 'true'}, function (error, result) {
        this.api.retrieveData(error, result, 'shorturl', callback);
    }.bind(this));
}

/**
 * Send a POST request to the following resource to create a new Shorturl for one of your Sites.
 * @param  {[string]}   url             the url to be shortned
 * @param  {Function} callback          the callback function
 */
function create (url, callback) {
    var body = {
        shorturl: {
            original_url: url
        }
    };
    this.api.post('shorturls', undefined, body, function (error, result) {
        this.api.retrieveData(error, result, 'shorturls', callback);
    });
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.del = del;
module.exports.create = create;
