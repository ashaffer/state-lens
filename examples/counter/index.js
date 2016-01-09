/**
 * Imports
 */
import {createStore, applyMiddleware} from 'redux'
import ephemeral from 'redux-ephemeral'
import logger from 'redux-logger'
import stateLens from '../../src'
import {dom, element} from 'deku'
import domready from '@f/domready'
import reducer from './reducer'
import App from './app'

/**
 * Setup store
 */

const initialState = {
  ui: stateLens(),
  numCounters: 0
}

const store = applyMiddleware(logger())(createStore)(ephemeral('ui', reducer), initialState)

/**
 * Setup rendering loop
 */

domready(() => {
  const {createRenderer} = dom
  const renderer = createRenderer(document.body, store.dispatch)
  const render = () => renderer(<App state={store.getState().ui} numCounters={store.getState().numCounters} />)

  store.subscribe(() => setTimeout(render, 0))
  render()
})
