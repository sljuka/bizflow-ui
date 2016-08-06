import { Record, Map } from 'immutable';

const InitialState = Record({
  processesOrder: [],
  processes: Map(),
  newInstanceProcessId: null
});
const initialState = new InitialState;

export default function processes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROCESSES_SUCCESS': {
      const pcss = action.payload.processes;
      const reformatedProcesses = Map(pcss.map((item) => [item.name, item]));

      return state
        .set('processes', reformatedProcesses)
        .set('processesOrder', pcss.map((item) => item.name));
    }
    case 'ATTEMPT_PROCESS_INSTANCE_CREATION': {
      const processId = action.payload.processId;

      return state.set('newInstanceProcessId', processId);
    }
    case 'CANCEL_PROCESS_INSTANCE_CREATION':
    case 'CREATE_PROCESS_INSTANCE_SUCCESS': {
      return state.set('newInstanceProcessId', null);
    }

    case 'DISPLAY_INSTANCE': {
      const { processName, instanceId } = action.payload;

      return state.setIn(['processes', processName, 'displayed'], instanceId);
    }
  }

  return state;
}
