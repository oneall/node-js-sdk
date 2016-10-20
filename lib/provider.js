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

/**
* @param  {Function} callback       the callback function
*/
function getFacebookPages(callback) {
    this.api.get('providers/facebook/pages', null, {}, function (error, result) {
        this.api.retrieveData(error, result, 'providers', callback);
    }.bind(this));
}

/**
* @param  {string} page_token       the page token that identifies the page
* @param  {Object} parts            object with the message parts (json) the page accepts
* @param  {Function} callback       the callback function
*/
function publishToFacebookPage(page_token, parts, callback) {
    this.api.post('providers/facebook/pages/@token/publish', page_token, {page_message: parts}, function (error, result) {
        this.api.retrieveData(error, result, 'message', callback);
    }.bind(this));
}

module.exports.getAll = getAll;
module.exports.getFacebookPages = getFacebookPages;
module.exports.publishToFacebookPage = publishToFacebookPage;
