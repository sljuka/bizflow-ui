import dataQuery from '../../lib/dataQuery.js';

export const fetchProcesses = () => {
  return dispatch => {
    const getPromise = async () => {
      const query = `{
        processes {
          id
          name
          description
        }
      }`;
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
