import dataQuery from '../../lib/dataQuery.js';

export function increment() {
  return { type: 'INCREMENT' };
}

export function decrement() {
  return { type: 'DECREMENT' };
}

export const magicAction2 = () => {
  return dispatch => {
    const getPromise = async () => {
      const query = `{
        users {
          id
          lastName
        }
      }`;
      const { users } = await dataQuery(`/api/graphql?query=${query}`);

      users.map(() => dispatch(increment()));
    };

    return dispatch({
      type: 'MAGIC_WOOWOO',
      payload: {
        promise: getPromise()
      }
    });
  };
};
