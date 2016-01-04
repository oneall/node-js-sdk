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
 * @param  {string} discussionReference     the discussion foreign id that identifies the discussion
 * @param  {Function} callback              the callback function
 */
function get(discussionToken, discussionReference, callback) {
    var params = null;
    if (typeof discussionReference === 'function') {
        callback = discussionReference;
        discussionReference = null;
    }
    if (discussionReference) {
        params = {
            discussion_reference: discussionReference
        };
    }
    this.api.get(_getDiscussionUrl(discussionToken), discussionReference, params, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

/**
 * Send a PUT request to create a discussion
 * @param  {[string]}   title                   A title for the discussion
 * @param  {[string]}   url                     A url for the discussion
 * @param  {[string]}   discussionReference     A uniq identifier for the discussion
 * @param  {Function}   callback                The callback function
 */
function create (title, url, discussionReference, callback) {
    var body = {
        discussion: {
            title: title,
            url: url,
            discussion_reference: discussionReference
        }
    };
    this.api.put('discussions', null, body, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

/**
* Send a DELETE request to this resource in order to delete a discussion.
* @param  {string} discussionToken          the discussion token that identifies the discussion
* @param  {string} discussionReference      the discussion foreign id that identifies the discussion
* @param  {Function} callback               the callback function
*/
function del (discussionToken, discussionReference, callback) {
    var params = {
        confirm_deletion: 'true'
    };

    if (discussionReference) {
        params.discussion_reference = discussionReference;
    }

    this.api.del(_getDiscussionUrl(discussionToken, 'comments'), discussionToken, params, function (error, result) {
        this.api.retrieveData(error, result, 'discussion', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to retrieve a discussion comment list.
 * @param  {string}     discussionToken             the discussion token that identifies the discussion
 * @param  {object}     params                      the pagination parameters
 * @param  {int}        params.page                 the page number to fetch
 * @param  {int}        params.entries_per_page     the number of items to fetch
 * @param  {int}        params.order_direction      order direction in which the posts will be fetched
 * @param  {string}     discussionReference         the discussion foreign id that identifies the discussion
 * @param  {Function}   callback                    the callback function
 */
function getComments(discussionToken, params, discussionReference, callback) {
    if (typeof discussionReference === 'function') {
        callback = discussionReference;
        discussionReference = null;
    }
    if (discussionReference) {
        params.discussion_reference = discussionReference;
    }
    this.api.get(_getDiscussionUrl(discussionToken, 'comments'), discussionToken, params, function (error, result) {
        this.api.retrieveData(error, result, 'comments', callback);
    }.bind(this));
}

/**
 * Send a GET request to this resource to retrieve a discussion comment list.
 * @param  {string}     commentToken                the comment token that identifies the comment
 * @param  {Function}   callback                    the callback function
 */
function getComment(commentToken, callback) {
    this.api.get('discussions/comments/@token', commentToken, null, function (error, result) {
        this.api.retrieveData(error, result, 'comment', callback);
    }.bind(this));
}

function getSummary(discussionTokens, discussionReferences, callback) {
    var params = {};

    if ((discussionTokens || discussionReferences)) {
        if (discussionTokens && discussionTokens.length) {
            params.discussion_token = discussionTokens.join(';');
        }

        if (discussionReferences && discussionReferences.length) {
            params.discussion_reference = discussionReferences.join(';');
        }
    }

    if (!params.discussion_token && !params.discussion_reference) {
        throw new Error('You must set either discussionTokens or a discussionReferences with at least one position');
    }

    this.api.get('discussions/summary', null, params, function (error, result) {
        this.api.retrieveData(error, result, 'discussions', callback);
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
 * @param  {Object}     author.author_reference     the author foreign id
 * @param  {Object}     author.description          the author description
 * @param  {Object}     author.picture_url          the author picture url
 * @param  {string}     parentCommentToken          the parent comment to nest the comment
 * @param  {string}     discussionReference         An external reference to the discussion you may use it instead of discussionToken
 * @param  {[string]}   authorReference             A uniq identifier for the discussion
 * @param  {Function}   callback                    The callback function
 */
function createComment (discussionToken, author, text, parentCommentToken, discussionReference, authorReference, callback) {
    var queryString = null, body = { comment: {}};

    if (!author) {
        author = {};
    }

    if (!discussionToken && !discussionReference) {
        throw new Error('You must set either a discussionToken or a discussionReference');
    }

    if (discussionReference) {
        body.discussion = { discussion_reference: discussionReference };
    }

    if (discussionToken) {
        body.discussion = { discussion_token: discussionToken };
    }

    if (author.author_reference && !authorReference) {
        authorReference = author.author_reference;
    }

    if ((!author.name || !author.email) && (!author.author_token) && (!author.identity_token) && !authorReference) {
        throw new Error('You must identify the user making the comment either by (name + email / author_token / identity_token / author_reference | authorReference)');
    }


    if (authorReference) {
        author.author_reference = authorReference;
    }
    body.comment.text = text;

    if (parentCommentToken) {
        body.comment.parent_comment_token = parentCommentToken;
    }
    body.comment.author = author;

    this.api.post('discussions/comments', null, body, queryString, function (error, result) {
        this.api.retrieveData(error, result, 'comment', callback);
    }.bind(this));
}

/**
 * [deleteComment description]
 * @param  {[type]}   commentToken    [description]
 * @param  {[type]}   recursiveDelete [description]
 * @param  {Function} callback        [description]
 * @return {[type]}                   [description]
 */
function deleteComment(commentToken, recursive, callback) {
    var params = {
        confirm_deletion: 'true'
    };

    if (typeof recursive === 'function') {
        callback = recursive;
        recursive = false;
    }

    params.recursive_delete = recursive || false;

    this.api.del('discussions/comments/@token', commentToken, params, function (error, result) {
        this.api.retrieveData(error, result, '*', callback);
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
        url = 'discussions/discussion';
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
    del: del,
    getComment: getComment,
    getComments: getComments,
    createComment: createComment,
    deleteComment: deleteComment,
    getSummary: getSummary
};
