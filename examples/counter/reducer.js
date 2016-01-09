/**
 * Reducer
 */

function reducer (state, action) {
  if (action.type === 'ADD_COUNTER') {
    return {
      ...state,
      numCounters: state.numCounters + 1
    }
  }

  return state
}

/**
 * Exports
 */

export default reducer
