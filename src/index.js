/**
 * Imports
 */

import {createEphemeral, toEphemeral, destroyEphemeral} from 'redux-ephemeral'

/**
 * Constants
 */

const SET_STATE = 'SET_STATE'

/**
 * state-lens
 */

function stateLens (state = {}, path = '') {
  state.__path = path
  state.get = get
  state.set = set
  state.destroy = destroy
  state.create = create
  return state
}

/**
 * Lens API
 */

function create (initialState) {
  return createEphemeral(this.__path, initialState)
}

function set (subpath, value) {
  return toEphemeral(this.__path, reducer, setState(subpath, value))
}

function get (subpath) {
  return stateLens(this[subpath], createPath(this.__path, subpath))
}

function destroy () {
  return destroyEphemeral(this.__path)
}

/**
 * Helpers
 */

function createPath (...args) {
  return args.filter(Boolean).join('.')
}

function setState (path, value) {
  let obj = arguments.length === 2
    ? {[path]: value}
    : path

  return {
    type: SET_STATE,
    payload: obj
  }
}

function reducer (state, action) {
  if (action.type === SET_STATE) {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}

/**
 * Exports
 */

export default stateLens
