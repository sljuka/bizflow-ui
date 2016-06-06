import fetch from 'isomorphic-fetch';

const dataFetch = async (query) => {
  const response = await fetch(query);
  const { data } = await response.json();
  return { ...data };
};

export default dataFetch;
