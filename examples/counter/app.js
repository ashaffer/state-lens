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

  render ({props, dispatch}) {
    const {state} = props
    return <div onClick={() => dispatch(state.set('value', state.value + 1))}>Value: {state.value}</div>
  }
})

/**
 * Exports
 */

export default App
