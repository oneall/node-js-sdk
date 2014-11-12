'use strict';

/**
 * Send a GET request to this resource to retrieve the complete list of discussions.
 * @param  {int} page                the page number
 * @param  {Function} callback      the callback function
 */
function getAll(page, callback) {
    this.api.get('discussions', null, {page: page}, function (error, result) {
        this.api.retrieveData(error, result, 'discussions', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to retrieve a discussion.
 * @param  {string} discussionToken         the discussion token that identifies the discussion
 * @param  {string} discussionForeignId     the discussion foreign id that identifies the discussion
 * @param  {Function} callback              the callback function
 */
function get(discussionToken, discussionForeignId, callback) {
    var params = null;
    if (typeof discussionForeignId === 'function') {
        callback = discussionForeignId;
        discussionForeignId = null;
    }
    if (discussionForeignId) {
        params = {
            foreign_reference: discussionForeignId
        };
    }
    this.api.get(_getDiscussionUrl(discussionToken), discussionToken, params, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

/**
 * Send a PUT request to create a discussion
 * @param  {[string]}   title           A title for the discussion
 * @param  {[string]}   url             A url for the discussion
 * @param  {[string]}   uid             A uniq identifier for the discussion
 * @param  {Function}   callback        the callback function
 */
function create (title, url, discussionForeignId, callback) {
    var body = {
        discussion: {
            title: title,
            url: url,
            foreign_reference: discussionForeignId
        }
    };
    this.api.put('discussions', null, body, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to retrieve a discussion comment list.
 * @param  {string} discussionToken          the discussion token that identifies the discussion
 * @param  {string} discussionForeignId     the discussion foreign id that identifies the discussion
 * @param  {Function} callback              the callback function
 */
function getComments(discussionToken, discussionForeignId, callback) {
    var params = null;
    if (typeof discussionForeignId === 'function') {
        callback = discussionForeignId;
        discussionForeignId = null;
    }
    if (discussionForeignId) {
        params = {
            foreign_reference: discussionForeignId
        };
    }
    this.api.get(_getDiscussionUrl(discussionToken, 'comments'), discussionToken, params, function (error, result) {
        this.api.retrieveData(error, result, 'comments', callback);
    }.bind(this));
}

/**
 * Send a POST request to create a comment for a discussion
 * @param  {string}     discussionToken             the discussion token that identifies the discussion
 * @param  {Object}     author                      the comment author data
 * @param  {Object}     author.name                 the author name
 * @param  {Object}     author.email                the author email
 * @param  {Object}     author.author_token         the author author token created on oneall
 * @param  {Object}     author.identity_token       the author identity token
 * @param  {Object}     author.foreign_reference    the author foreign id
 * @param  {Object}     author.description          the author description
 * @param  {Object}     author.foreign_reference    the author foreign id
 * @param  {Object}     author.picture_url          the author picture url
 * @param  {string}     parentCommentToken          the parent comment to nest the comment
 * @param  {string}     discussionForeignId         An external reference to the discussion you may use it instead of discussionToken
 * @param  {[string]}   uid                         A uniq identifier for the discussion
 * @param  {Function}   callback                    The callback function
 */
function createComment (discussionToken, author, text, parentCommentToken, discussionForeignId, authorForeignId, callback) {
    var body = { comment: {}};

    if (!author) {
        author = {};
    }

    if (!discussionToken && !discussionForeignId) {
        throw new Error('You must set either a discussionToken or a discussionForeignId');
    }

    if (author.foreign_reference && !authorForeignId) {
        authorForeignId = author.foreign_reference;
    }

    if ((!author.name || !author.email) && (!author.author_token) && (!author.identity_token) && !authorForeignId) {
        throw new Error('You must identify the user making the comment either by (name + email / author_token / identity_token / foreign_reference | authorForeignId)');
    }


    if (authorForeignId) {
        author.foreign_reference = authorForeignId;
    }
    body.comment.text = text;

    if (parentCommentToken) {
        body.comment.parent_comment_token = parentCommentToken;
    }
    body.comment.author = author;
    console.log(author);
    this.api.post(_getDiscussionUrl(discussionToken, 'comments'), discussionToken, body, function (error, result) {
        this.api.retrieveData(error, result, 'comment', callback);
    }.bind(this));
}


/**
* Send a DELETE request to this resource in order to delete a discussion.
* @param  {string} discussionToken          the discussion token that identifies the discussion
* @param  {string} discussionForeignId      the discussion foreign id that identifies the discussion
* @param  {Function} callback               the callback function
*/
function del (discussionToken, discussionForeignId, callback) {
    var params = {
        confirm_deletion: 'true'
    };

    if (discussionForeignId) {
        params.foreign_reference = discussionForeignId;
    }

    this.api.del(_getDiscussionUrl(discussionToken, 'comments'), discussionToken, params, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

// --------- PRIVATE

/**
 * Based on having a discussionToken this method will return a different url
 * @param  {string}     discussionToken     The token identifying the discussions
 * @param  {[string]}   subEntity           An optional sub entity to be called
 * @return {string}                         The url to be called on oneall api
 */
function _getDiscussionUrl(discussionToken, subEntity) {
    var url;
    if (discussionToken) {
        url = 'discussions/@token';
    } else {
        url = 'discussions';
    }
    if (subEntity) {
        url += '/' + subEntity;
    }
    return url;
}


module.exports = {
    getAll: getAll,
    get: get,
    create: create,
    getComments: getComments,
    createComment: createComment,
    del: del
};


