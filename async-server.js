import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'

export const Methods = new Proxy({}, {
  get: (obj, key) => (...args) => Meteor.call(key, ...args)
})

export const getProxy = (Thing) => Thing

export const MeteorAsync = getProxy(Meteor)

export const meteorizePromise = (promise) => {
  let reactiveVar = new ReactiveVar(false)
  promise.then(res => {
    reactiveVar.set(res)
  }, err => {
    if (err) {
      console.error(err)
    }
    reactiveVar.set(null)
  })
  return reactiveVar
}
