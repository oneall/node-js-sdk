'use strict';

/**
 * Send a PUT request to this resource to initiate a snapshot of a previously published message.
 * @param  {string}   sharedMessageToken the token that identifies the record
 * @param  {string}   pingbackUri        the url to be called when the snapshot is ready on the oneall side
 * @param  {Function} callback           the callback function
 */
function initiate(sharedMessageToken, pingbackUri, callback) {
    var body = {
        analytics: {
            sharing:{
                sharing_message_token: sharedMessageToken
            }
        }
    };

    if (pingbackUri) {
        body.analytics.sharing.pingback_uri = pingbackUri;
    }

    this.api.put('sharing/analytics/snapshots', null, body, function (error, result) {
        this.api.retrieveData(error, result, null, callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to obtain the list of your snapshots.
 * @param {int} page                the page number
 * @param  {Function} callback      the callback function
 */
function getAll(page, callback) {
    this.api.get('sharing/analytics/snapshots', null, {page:page}, function (error, result) {
        this.api.retrieveData(error, result, 'sharing_analytics_snapshots', callback);
    }.bind(this));
}

/**
* Send a GET request to this resource to retrieve the details of an existing snapshot.
* @param  {string} analyticsToken   the token that identifies the record
* @param  {Function} callback       the callback function
*/
function get(analyticsToken, callback) {
    this.api.get('sharing/analytics/snapshots/@token', analyticsToken, {}, function (error, result) {
        this.api.retrieveData(error, result, 'sharing_analytics_snapshot', callback);
    }.bind(this));
}

/**
* Send a DELETE request to the following resource to delete an existing snapshot.
* @param  {string} analyticsToken   the token that identifies the record
* @param  {Function} callback       the callback function
*/
function del(analyticsToken, callback) {
    this.api.del('sharing/analytics/snapshots/@token', analyticsToken, {confirm_deletion: 'true'}, function (error, result) {
        this.api.retrieveData(error, result, null, callback);
    }.bind(this));
}

module.exports.initiate = initiate;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.del = del;
