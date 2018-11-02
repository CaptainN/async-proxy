import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'

const makePromise = (Thing, key, args) => (
  new Promise(
    (resolve, reject) => Thing[key](...args, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  )
)

export const callAsync = (...args) => makePromise(Meteor, 'call', args)

export const Methods = new Proxy({}, {
  get: (obj, key) => (...args) => callAsync(key, ...args)
})

export const getProxy = (Thing) => (
  new Proxy({}, {
    get: (obj, key) => (...args) => makePromise(Thing, key, args)
  })
)

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
