import { Record } from 'immutable';

const InitialState = Record({
  processes: []
});
const initialState = new InitialState;

export default function processes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROCESSES_SUCCESS': {
      const pcss = action.payload.processes;

      return state.set('processes', pcss);
    }
    default:
      return state;
  }
}
