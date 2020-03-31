/* global Package */
Package.describe({
  name: 'npdev:async-proxy',
  summary: 'A set of utils to work with Meteor methods and other APIs with async/await',
  description: 'A set of utils to work with Meteor methods and other APIs with async/await',
  version: '0.2.1',
  git: 'https://github.com/GoogleChrome/proxy-polyfill.git'
})

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.5')
  api.use('ecmascript')
  api.mainModule('async.js', ['client', 'server'], { lazy: true })
})
