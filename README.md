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

Supporting Legacy Browsers
==========================

For an easy way to support legacy browsers (IE) just install [npdev:legacy-proxy-polyfill](https://github.com/CaptainN/npdev-legacy-proxy-polyfill). It will provide Google Chrome's Proxy polyfill in the legacy bundle when needed.
