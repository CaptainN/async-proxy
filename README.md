NP Dev: async proxy utils
=========================

This package contains a set of utilities for working with Metoer methods and other Meteor APIs, in a way that feels more natural, using async/await instead of callbacks.

Install it from atmosphere:

`meteor add npdev:async-proxy`

There are 3 utilities available:

callAsync
---------

```js
import { callAsync } from 'meteor/npdev:async-proxy'
```

This methods allows you to call a method using async/await (it returns a Promise) like:

```javascript
try {
  await callAsync('methodName', 'arg1', 'arg2')
} catch (error) {
  console.error(error)
}
```

This is an improvement! No more callbacks. But we can do better! It's still a little weird to invoke a method with a string, so:

Methods
-------

```js
import { Methods } from 'meteor/npdev:async-proxy'
```

Methods is a Proxy, which allows a more natural invocation of remote methods:

```javascript
try {
  var result = await Methods.methodName('arg1', 'arg2')
} catch (error) {
  console.error(error)
}
```

MeteorAsync
-----------

```js
import { Methods } from 'meteor/npdev:async-proxy'
```

But what about non-methods - it'd be nice to have async there too. MeteorAsync is another proxy for the Meteor object as a whole. It's not very smart about how it wraps commands to properties, so you'll have to be careful.

```javascript
try {
  var result = await MeteorAsync.loginWithPassword('username', 'password')
} catch (error) {
  console.error(error)
}
```

Limitations in Legacy Browsers
==============================

An earlier version of this readme incorrectly claimed that Google Chrome's proxy-polyfill could be used to make the Methods proxy function, but it cannot. The polyfill only works with properties defined at specification time. Since we don't have a list of all methods, the Proxy cannot work. If you need support for older browsers (like IE), you can still use the non-proxy based methods, like `callAsync`.
