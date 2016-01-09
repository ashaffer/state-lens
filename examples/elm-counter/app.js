/**
 * Imports
 */

import {addCounter} from './actions'
import localize from './localize'
import times from '@f/times'
import {element} from 'deku'

/**
 * App
 */

const App = localize(({props, dispatch}) => {
  const {state, numCounters} = props

  return (
    <div>
      <button onClick={() => dispatch(addCounter())}>Add counter</button>
      <div>
        {times(numCounters, i => <Counter state={state.get('counter_' + i)} />)}
      </div>
    </div>
  )
})

const Counter = localize({
  initialState (props) {
    return {value: 0}
  },

  reducer (state, action) {
    if (action.type === 'INCREMENT') {
      return {
        ...state,
        value: state.value + 1
      }
    }

    return state
  },

  render ({props, dispatch, local}) {
    const {state} = props
    return <div onClick={() => dispatch(local(increment()))}>Value: {state.value}</div>
  }
})

function increment () {
  return {
    type: 'INCREMENT'
  }
}

/**
 * Exports
 */

export default App
