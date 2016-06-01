import fetch from 'isomorphic-fetch';

export function increment() {
  return { type: 'INCREMENT' };
}

export function decrement() {
  return { type: 'DECREMENT' };
}

export function magicAction2() {
  const query = `{
    users {
      id
      lastName
    }
  }`;

  return (dispatch) => {
    const getPromise = () =>
      fetch(`/api/graphql?query=${query}`)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Bad response from server');
          return response.json();
        })
        .then(({ data: { users } }) => {
          users.map(() => dispatch(increment()));
        })
        .catch((e) => {
          console.log(e.message);
        });

    return {
      type: 'MAGIC_WOOWOO',
      payload: {
        promise: getPromise()
      }
    };
  };
}
