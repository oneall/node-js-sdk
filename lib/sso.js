'use strict';

/**
 * Send a GET request to this resource to obtain a list with the open SSO sessions.
 * @param {int} page                    the page number
 * @param  {Function} callback          the callback function
 */
function getAll(page, callback) {
    var that = this;
    that.api.get('sso/sessions', null, {page: page}, function (error, result) {
        that.api.retrieveData(error, result, 'ssosessions', callback);
    });
}

/**
 * Send a PUT request to the following resource to create a new SSO session for a user.
 * @param  {string}   userToken         the token that identifies the user
 * @param  {string}   identityToken     the token that identifies the user/socialnetwork
 * @param  {Object}   opts              object with optionals {top_realm:..., sub_realm:..., lifetime:...}
 * @param  {Function} callback          the callback function
 */
function create(userToken, identityToken, opts, callback) {
    var that = this;
    opts.user_token = userToken;
    opts.identity_token = identityToken;
    that.api.put('sso/sessions', null, { sso_session: opts }, function (error, result) {
        that.api.retrieveData(error, result, 'ssosession', callback);
    });
}

module.exports.getAll = getAll;
module.exports.create = create;
