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

Update: For an easier way than the description below, just install [npdev:legacy-proxy-polyfill](https://github.com/CaptainN/npdev-legacy-proxy-polyfill), and forget the rest!

Method and MeteorAsync both rely on JavaScript's `Proxy` class, which is not available in certain older browsers (IE), and is not included in babel-polyfill. While Proxy cannot be completely polyfilled, the Google Chrome Proxy Polyfill does polyfill enough of the API to work with this package.

If you are using meteor 1.7+ (and it's awesome modern/legacy bundle system), and meteor's mainModule config in package.json, you can install the polyfill from npm, and add it to the legacy bundle using meteor's package.json config - this avoids including it in the modern bundle.

in the terminal:
`meteor npm i proxy-polyfill`

in client/legacy.js:

```javascript
if (!window.Proxy) {
  Proxy = require('proxy-polyfill/src/proxy')
}
```

in package.json:

```json
  "meteor": {
    "mainModule": {
      "client": "client/main.js",
      "server": "server/main.js",
      "legacy": "client/legacy.js"
    }
  }
```

If you are using Meteor 1.7+ and not using `mainModule` (using the old eager folders), you can create a local package:

package.js:

```javascript
Package.describe({
  name: 'google-chrome:proxy-polyfill',
  summary: 'Polyfill for the Proxy object',
  version: '0.2.0',
  git: 'https://github.com/GoogleChrome/proxy-polyfill.git'
})

Npm.depends({'proxy-polyfill': '0.2.0'})

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.7')
  api.addFiles('proxy.js', 'legacy')
})
```

proxy.js:

```javascript
if (!window.Proxy) {
  Proxy = require('proxy-polyfill/src/proxy')
}
```

If you are not using Meteor 1.7 yet, you can still use the polyfill, but will need to include the Proxy polyfill for all browsers. Install `proxy-polyfill` from npm, and then include proxy.js from above in your `client` folder.
