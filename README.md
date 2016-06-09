
# oneall-sdk
An sdk that maps the Oneall REST API into nodejs.





# How to use

The following example fetches a user information based on a connection token. All the methods implemented on this sdk follow the same arguments / return logic.


```js
var Oneall = require('oneall');
var oneall = new Oneall({
    endpoint: 'https://MY_SERVICE.api.oneall.com',
    publickey: '11111111-1111-1111-1111-111111111111',
    privatekey: '222222222-2222-2222-2222-2222222222222'
});

oneall.connection.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Connection list: ', data);
        console.log('Full response data: ', fullData);
    }
);
```

All the entities and methods described on: http://docs.oneall.com/api/ are also available on this sdk.





# API

```js
var Oneall = require('oneall');
var oneall = new Oneall({
    endpoint: 'https://MY_SERVICE.api.oneall.com',
    publickey: '11111111-1111-1111-1111-111111111111',
    privatekey: '222222222-2222-2222-2222-2222222222222'
});
```



## Connection
**Oneall API reference:** http://docs.oneall.com/api/resources/connections/

The connection API is used to retrieve the social network profile data of a user after he connected with his social network account. The OneAll API returns a standardized field structure for data received from any of the social networks.

The connection endpoints are mainly used in the callback handler script. This is a small script located on your server and it is used to retrieve the social network profile data of a user which has logged in through one of our services, like for example Social Login.



### oneall.connection.getAll(page, callback)

Send a GET request to this resource to retrieve the complete list of social network connections made to your Site.

  ```js
  oneall.connection.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.connection.get(connectionToken, callback)

Send a GET request to this resource to retrieve the details of a social network connection made on your Site.

  ```js
  oneall.connection.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `connectionToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.connection.getUser(connectionToken, callback)

Send a GET request to this resource to retrieve the details of a social network connection made on your Site.
(this is a helper method, fullData argument on the callback, will be exactly the same as the one on oneall.connection.get)

  ```js
  oneall.connection.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `connectionToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData




## Identity
**Oneall API reference:** http://docs.oneall.com/api/resources/identities/

An identity is the data representation of a social network profile. Identities are created when a person authenticates with his social network account using a OneAll service (Social Login for example).

An identity can only be linked to one user at a time, but one and the same user may have multiple related identities. A Facebook account can for example only belong to one person, but one and the same person have many social network accounts (LinkedIn, Twitter ...) that belong to her.



### oneall.identity.getAll(page, callback)

Send a GET request to this resource to obtain the complete list of your identities.

```js
  oneall.identity.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.identity.get(identityToken, callback)

Send a GET request to this resource to obtain the complete list of your identities.

```js
  oneall.identity.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `identityToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.identity.del(identityToken, callback)

Send a DELETE request to this resource in order to delete an identity.

```js
  oneall.identity.del(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `identityToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.identity.synchronize(identityToken, callback)

Send a PUT request to this resource to synchronize an identity with the underlying social network profile.

```js
  oneall.identity.synchronize(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `identityToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.identity.reLink(identityToken, userToken, callback)

Send a PUT request to this resource to link an identity to another user.

```js
  oneall.identity.synchronize(
    '55555555-5555-5555-5555-5555555555555',
    '75555555-7555-7555-7555-7555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `identityToken` the string token
  - `user_token` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData




## User
**Oneall API reference:** http://docs.oneall.com/api/resources/users/

A user is the data representation of a person that is using the OneAll plugins and services that you have added on your website or mobile application.

Each user has a least one but may have multiple identities. An identity is the data representation of a social network profile, it is created when a person signs in for the first time using Social Login and it is updated on subsequent sign ins of the same user.



### oneall.user.getAll(page, callback)

Send a GET request to this resource to obtain the list of your users.

```js
  oneall.user.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.user.get(userToken, callback)

Send a GET request to this resource to retrieve the details of an existing user.

```js
  oneall.identity.getAll(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  Arguments:

  - `userToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.user.del(userToken, callback)

Send a DELETE request to this resource in order to delete an identity.

```js
  oneall.user.del(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `userToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.user.getContacts(userToken, callback)

Send a GET request to the following resource to retrieve the social network contacts of an existing user.

```js
  oneall.user.getContacts(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `userToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.user.publish(userToken, providers, parts, callback)

Send a POST request to this resource to publish content (posts, tweets ...) on the social network account of a user. More advanced sharing features are available through our Social Sharing API.

```js
  oneall.user.publish(
    '55555555-5555-5555-5555-5555555555555',
    ['facebook', 'twitter', 'linkedin'],
    { text: { body: 'this is the message on the social post' } }
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `userToken` the string token
  - `providers` the array with the provider keys to post to
  - `parts.text.body` The text to be published on the social network.
  - `callback` method to be executed that will receive as argument the error, data and fullData

  **Optional arguments**

  - `parts.video.url` The URL of a video to be included in the publication.
  - `parts.picture.url` The URL of a picture to be included in the publication.
  - `parts.link.url` A link to be included in the publication.
  - `parts.link.name` The name of the included link.
  - `parts.link.caption` The caption of the included link.
  - `parts.link.description` The description of the included link.
  - `parts.upload[].name` The name of the file to be uploaded.
  - `parts.upload[].data` The base64 encoded representation of the file data.





## sharingMessage
**Oneall API reference:** http://docs.oneall.com/api/resources/social-sharing/

With our sharing API you can easily share content to multiple social networks simultaneously.



### oneall.sharingMessage.getAll(page, callback)

Send a GET  request to this resource to retrieve the complete list of published messages.

```js
  oneall.sharingMessage.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.sharingMessage.get(sharingMessageToken, callback)

Send a GET request to this resource to retrieve the details of a previously published message.

```js
  oneall.sharingMessage.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `sharingMessageToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.sharingMessage.publish(userToken, providers, parts, callback)

Send a POST request to this resource to publish content on behalf of a user.

```js
  oneall.sharingMessage.publish(
    '55555555-5555-5555-5555-5555555555555',
    ['facebook', 'twitter', 'linkedin'],
    { text: { body: 'this is the message on the social post' } }
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `userToken` the string token
  - `providers` the array with the provider keys to post to
  - `parts.text.body` The text to be published on the social network.
  - `callback` method to be executed that will receive as argument the error, data and fullData

  **Optional arguments:**

  - `parts.video.url` The URL of a video to be included in the publication.
  - `parts.picture.url` The URL of a picture to be included in the publication.
  - `parts.link.url` A link to be included in the publication.
  - `parts.link.name` The name of the included link.
  - `parts.link.caption` The caption of the included link.
  - `parts.link.description` The description of the included link.
  - `parts.upload[].name` The name of the file to be uploaded.
  - `parts.upload[].data` The base64 encoded representation of the file data.




### oneall.sharingMessage.rePublish(messageToken, userToken, providers, callback)

Send a POST request to this resource to publish a previously published message to other social networks.

```js
  oneall.sharingMessage.publish(
    '55555555-5555-5555-5555-5555555555555',
    '11155555-5555-5555-5555-5555555555111',
    ['facebook', 'twitter'],
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**
  - `userToken` the string token
  - `userToken` the string token
  - `providers` the array with the provider keys to post to
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.sharingMessage.del(messageToken, callback)

Send a DELETE request to this resource to permanently delete an existing sharing message. Please note that the message will not be removed from the social networks.

```js
  oneall.sharingMessage.del(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**
  - `messageToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData




## analytics
**Oneall API reference:** http://docs.oneall.com/api/resources/sharing-analytics/

With our Sharing Analytics API you can measure and optimise the impact of content shared through our sharing api.



### oneall.analytics.getAll(page, callback)

Send a GET request to this resource to obtain the list of your snapshots.

```js
  oneall.analytics.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.analytics.get(analyticsToken, callback)

Send a GET request to this resource to retrieve the details of an existing snapshot.

```js
  oneall.analytics.get(
    '888888888-8888-8888-8888-8888888888888',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `analyticsToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.analytics.del(analyticsToken, callback)

Send a DELETE request to the following resource to delete an existing snapshot.

```js
  oneall.analytics.del(
    '888888888-8888-8888-8888-8888888888888',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `analyticsToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.analytics.initiate(sharedMessageToken, pingbackUri, callback)

Send a PUT request to this resource to initiate a snapshot of a previously published message.

```js
  oneall.analytics.initiate(
    '55555555-5555-5555-5555-5555555555555',
    'http://mydomain/dealwithsnapshotconclusion.html',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
  );
```

  **Arguments:**

  - `sharedMessageToken` the string token
  - `pingbackUri` the string url to be called when the screenshot is created
  - `callback` method to be executed that will receive as argument the error, data and fullData




## shorturl
**Oneall API reference:** http://docs.oneall.com/api/resources/shorturls/


The OneAll API includes a custom url shortener that enables you to track trends in site registrations, returning visitors, social posts and resulting referral traffic. The corresponding reports can be viewed in the Social Insights section of your account.

The URL Shortener can either be embedded in our Social Sharing API (set the flag enable_tracking to 1) or used as independent module by using the following resources.

The <shorturl_token> is the key that uniquely identifies a shortened url.



### oneall.shorturl.getAll(page, callback)

Send a GET request to the following resource to retrieve the shortened urls for one of your Sites.

  ```js
  oneall.shorturl.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.shorturl.get(shorturlToken, callback)

Send a GET request to the following resource to retrieve the details of an existing Shorturl.

  ```js
  oneall.shorturl.get(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `shorturlToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.shorturl.create(url, callback)

Send a GET request to the following resource to retrieve the details of an existing Shorturl.

  ```js
  oneall.shorturl.create(
    'http://www.example.org/page.html',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `url` The URL for which you want to create a short url, i.e. http://www.example.org/page.html
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.shorturl.del(shorturlToken, callback)

Send a DELETE request to the following resource to delete an existing Shorturl.

  ```js
  oneall.shorturl.del(
    '55555555-5555-5555-5555-5555555555555',
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `shorturlToken` the string token
  - `callback` method to be executed that will receive as argument the error, data and fullData




## SSO
**Oneall API reference:** http://docs.oneall.com/api/resources/sso/

Single Sign-On (SSO) is a mechanism that allows you to immediately sign in users as they browse between multiple and independent websites.  Take away the need for the user to re-enter his authentication credentials when he switches from one of your websites to another. A complete implementation guide is available here.

The <sso_session_token> is the key that uniquely identifies a single sign-on session.



### oneall.sso.getAll(page, callback)

Send a GET request to this resource to obtain a list with the open SSO sessions.

  ```js
  oneall.sso.getAll(
    1,
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```

  **Arguments:**

  - `page` page number to be retrieved
  - `callback` method to be executed that will receive as argument the error, data and fullData



### oneall.sso.create(userToken, identityToken, opts, callback)

Send a PUT request to the following resource to create a new SSO session for a user.

  ```js
  oneall.shorturl.create(
    '555555555-5555-5555-5555-555555555555555',
    '115555555-1551-1551-1551-555555555555511',

    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```
  **Arguments:**

  - `userToken` The token of the user for whom you want to initiate the SSO session.
  - `identityToken` The token of the identity that should be used to login.
  - `callback` method to be executed that will receive as argument the error, data and fullData

  **Optional Arguments**
 
  - `opts.top_realm` A string to specify the primary realm of this SSO session.
  - `opts.sub_realm` A string to specify the secondary realm of this SSO session.
  - `opts.lifetime` A numeric value that represents the lifetime of the SSO session in seconds.




## provider


### oneall.provider.getAll(callback)

Send a GET request to this resource to retrieve a list of configured providers.
 
  ```js
  oneall.provider.getAll(
    function (err, data, fullData) {
        if (err) {
            throw(err);
        }
        console.log('Meaningful data: ', data);
        console.log('Full data: ', fullData);
    }
);
```

 **Arguments:**

  - `callback` method to be executed that will receive as argument the error, data and fullData


