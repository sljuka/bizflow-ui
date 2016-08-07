import { Record, Map } from 'immutable';
import toSnakeCase from '../../lib/toSnakeCase';

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
      const reformatedProcesses = Map(pcss.map((item) => [toSnakeCase(item.name), item]));

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
      const a = state.updateIn(['processes', processName], pcss => {
        pcss.displayed = instanceId; // eslint-disable-line no-param-reassign
        return pcss;
      });
      return a;
    }
  }

  return state;
}
