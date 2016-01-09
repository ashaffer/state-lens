/**
 * Localize a deku component
 */

function localize (component) {
  if ('function' === typeof component) {
    component = {render: component}
  }

  const {render, onCreate = () => {}, onRemove = () => {}, initialState = () => ({})} = component

  component.onCreate = (model) => {
    model.dispatch(model.props.state.create(initialState(model)))
    model.local = local(model)

    return onCreate(model)
  }

  component.render = (model) => {
    model.local = local(model)
    return render(model)
  }

  component.onRemove = (model) => {
    model.dispatch(model.props.state.destroy())
    model.local = local(model)

    return onRemove(model)
  }

  function local (model) {
    return action => model.props.state.to(component.reducer, action)
  }

  return component
}

/**
 * Exports
 */

export default localize
