/**
 * Localize a deku component
 */

function localize (component) {
  if ('function' === typeof component) {
    component = {render: component}
  }

  const {onCreate = () => {}, onRemove = () => {}, initialState = () => ({})} = component

  component.onCreate = (model) => {
    model.dispatch(model.props.state.create(initialState(model)))
    return onCreate(model)
  }

  component.onRemove = (model) => {
    model.dispatch(model.props.state.destroy())
    return onRemove(model)
  }

  return component
}

/**
 * Exports
 */

export default localize
