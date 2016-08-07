import dataQuery from '../../lib/dataQuery.js';
import dataMutation from '../../lib/dataMutation.js';
import toSnakeCase from '../../lib/toSnakeCase';

const PROCESS_QUERY = `
{
  processes {
    id
    name
    description
    instances {
      id
      name
      additionalInfo
    }
  }
}
`;

const createInstanceMutation = (pcssId) => {
  return `
    mutation {
      addProcessInstance(pcssId: ${pcssId}, userId: 1, additionalInfo: "Some info :)") {
        id
      }
    }
  `;
};

export const fetchProcesses = () => {
  return dispatch => {
    const getPromise = async () => {
      const query = PROCESS_QUERY;
      const data = await dataQuery(`/api/graphql?query=${query}`);

      return data;
    };

    return dispatch({
      type: 'FETCH_PROCESSES',
      payload: {
        promise: getPromise()
      }
    });
  };
};

export const createProcessInstance = (pcssId) => {
  return dispatch => {
    const getPromise = async () => {
      const mutation = createInstanceMutation(pcssId);
      const data = await dataMutation(`/api/graphql?query=${mutation}`);

      if (!data.addProcessInstance) return;

      await dispatch(fetchProcesses());
    };

    return dispatch({
      type: 'CREATE_PROCESS_INSTANCE',
      payload: {
        promise: getPromise()
      }
    });
  };
};

export const attemptProcessInstanceCreation = (processId) =>
  ({
    type: 'ATTEMPT_PROCESS_INSTANCE_CREATION',
    payload: {
      processId
    }
  });

export const cancelProcessInstanceCreation = () =>
  ({ type: 'CANCEL_PROCESS_INSTANCE_CREATION' });

export const displayInstance = (processName, instanceId) =>
  ({
    type: 'DISPLAY_INSTANCE',
    payload: {
      processName: toSnakeCase(processName),
      instanceId
    }
  });
