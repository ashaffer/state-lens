
# state-lens

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

State cursor/lens thing

## Installation

    $ npm install state-lens

## Usage

Just an experiment right now to create a minimal state lens/cursor thing to use for local state in [deku](https://github.com/dekujs/deku). Put a stateLens in your initialState like this:

```javascript
import ephemeral from 'redux-ephemeral'
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(ephemeral('ui', reducer), {
  ui: stateLens()
})

// ...

render(<App state={store.getState().ui})
```

Then pass state in as a prop to any component that wants state, and has been wrapped by the code below.

## Deku component wrapper

```javascript
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
```
