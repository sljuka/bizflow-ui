import { Record } from 'immutable';

const InitialState = Record({
  counter: 0
});
const initialState = new InitialState;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state.update('counter', (value) => value + 1);
    case 'DECREMENT':
      return state.update('counter', (value) => value - 1);
    default:
      return state;
  }
}
