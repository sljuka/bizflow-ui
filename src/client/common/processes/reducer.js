import { Record, Map } from 'immutable';

const InitialState = Record({
  processesOrder: [],
  processes: [],
  creatingProcessId: null
});
const initialState = new InitialState;

export default function processes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROCESSES_SUCCESS': {
      const pcss = action.payload.processes;
      const reformatedProcesses = Map(pcss.map((item) => [item.id, item]));
      debugger;

      return state
        .set('processes', pcss)
        .set('processesOrder', pcss.map((item) => item.id));
    }
    case 'ATTEMPT_PROCESS_INSTANCE_CREATION': {
      const processId = action.payload.processId;

      return state.set('creatingProcessId', processId);
    }
    case 'CANCEL_PROCESS_INSTANCE_CREATION':
    case 'CREATE_PROCESS_INSTANCE_SUCCESS': {
      return state.set('creatingProcessId', null);
    }

    case 'DISPLAY_INSTANCE': {
      const {processName, instanceId} = action.payload;

      const pcss = processes.indexOf(item => item.name === processName);

    }
  }

  return state;
}
