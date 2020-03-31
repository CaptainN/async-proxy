import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'

export const getPromise = (func, ...args) => (
  new Promise(
    (resolve, reject) => func(...args, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  )
)

export const callAsync = (...args) => getPromise(Meteor.call, ...args)

export const meteorizePromise = (promise) => {
  const reactiveVar = new ReactiveVar(false)
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

if (typeof Proxy !== 'undefined') {
  export const Methods = new Proxy({}, {
    get: (obj, key) => (...args) => callAsync(key, ...args)
  })

  export const getProxy = (Thing) => (
    new Proxy(Thing, {
      get: (obj, key) => (...args) => getPromise(Thing[key], ...args)
    })
  )

  export const MeteorAsync = getProxy(Meteor)
}
