'use strict';

var request = require('request');


function Api (cfg) {
    this.cfg = cfg;
}

/**
 * Parses the requestUrl, it assumes that the API has two entity levels at most,
 * and inserts the token in the middle of them if one is provided.
 * @param  {string} requestUrl the base url for the http request
 * @param  {string} token      an optional token to be part of the url
 * @return {string}            the url to be called by the http request function
 */
Api.prototype.parseUrl = function(url, token) {
    if (token !== null) {
        url = url.replace('@token', token);
    }
    url += '.json';
    return this.cfg.endpoint + '/' + url;
};

/**
 * Get the request options based on the configuration
 * @param  {Object} qs      A object with one level structure to be sent as query string
 * @param  {Object} json    A object to be sent stringfied as the request body
 * @return {Object}         A Object that will be fed to the the http request funcion
 */
Api.prototype.getOpts = function(qs, json) {
    var opts = {};
    opts.auth = {
        'user': this.cfg.publickey,
        'pass': this.cfg.privatekey
    };
    if (qs !== undefined) {
        opts.qs = qs;
    }
    if (json !== undefined) {
        opts.body = JSON.stringify(json);
    }
    opts.encoding = 'utf8';
    return opts;
};

/**
 * makes a request to the get API
 * @param  {Function} fn         a function that makes a http request
 * @param  {string}   requestUrl the url to be called
 * @param  {Object}   params     The token, body and queryString to send on the request. {token:...,qs:...,body:...}
 * @param  {Function} callback   the callback function
 */
Api.prototype.request = function(fn, requestUrl, params, callback) {
    var token = params.token,
        queryString = params.qs,
        body = params.body,
        url = this.parseUrl(requestUrl, token),
        opts = this.getOpts(queryString, body);

    fn(
        url,
        opts,
        function (error, response, body) {
            var jsonBody;
            if (error) {
                callback(error);
                return;
            }
            try {
                jsonBody = JSON.parse(body);
            } catch (e) {
                callback(e);
                return;
            }
            callback(null, jsonBody);
        }
    );
};

/**
 * makes a get request to the oneall api
 * @param  {string}   requestUrl the url to call
 * @param  {string}   token      an optional token
 * @param  {Function} callback   the callback function
 */
Api.prototype.get = function (requestUrl, token, qs, callback) {
    var params = {
        token: token,
        qs: qs
    };
    this.request.call(this, request.get.bind(request), requestUrl, params, callback);
};

/**
 * makes a post request to the oneall api
 * @param  {string}   requestUrl the url to call
 * @param  {string}   token      an optional token
 * @param  {Object}   body       A object to be sent stringfied as the request body
 * @param  {Function} callback   the callback function
 */
Api.prototype.post = function (requestUrl, token, body, qs, callback) {
    if (typeof qs === 'function') {
        callback = qs;
        qs = null;
    }
    var params = {
        token: token,
        body: {request: body}
    };
    if (qs) {
        params.qs = qs;
    }
    this.request.call(this, request.post.bind(request), requestUrl, params, callback);
};

/**
 * makes a delete request to the oneall api
 * @param  {string}   requestUrl the url to call
 * @param  {string}   token      an optional token
 * @param  {Object}   qs         A object with one level structure to be sent as query string
 * @param  {Function} callback   the callback function
 *
 */
Api.prototype.del = function (requestUrl, token, qs, callback) {
    var params = {
        token: token,
        qs: qs
    };
    this.request.call(this, request.del.bind(request), requestUrl, params, callback);
};

/**
 * makes a put request to the oneall api
 * @param  {string}   requestUrl the url to call
 * @param  {string}   token      an optional token
 * @param  {Object}   body       A object to be sent stringfied as the request body
 * @param  {Function} callback   the callback function
 *
 */
Api.prototype.put = function (requestUrl, token, body, callback) {
    var params = {
        token: token,
        body: {request: body}
    };
    this.request.call(this, request.put.bind(request), requestUrl, params, callback);
};

/**
 * Parses the response and calls the callback function with a standard response json
 * @param  {String}   error    [description]
 * @param  {Json}   jsonBody [description]
 * @param  {String}   tag      [description]
 * @param  {Function} callback [description]
 */
Api.prototype.retrieveData = function (error, jsonBody, tag, callback) {
    var response = {};
    if (error) {
        callback(error);
        return;
    }
    try {
        if (jsonBody.response.result) {
            if (tag !== null && tag !== '*' && jsonBody.response.result.data[tag] !== undefined) {
                response.data = jsonBody.response.result.data[tag];
            } if (tag === '*') {
                response.data = jsonBody.response.result.data;
            }
            if (jsonBody.response.result.status) {
                response.resStatus = jsonBody.response.result.status;
            }
        }

        if (jsonBody.response.request.status !== undefined) {
            response.status = jsonBody.response.request.status;
        }

    } catch (e) {
        callback(e);
        return;
    }
    callback(null, response, jsonBody);
};

module.exports = Api;
