import fetch from 'isomorphic-fetch';

const dataMutation = async (mutation) => {
  const response = await fetch(mutation, { method: 'post' });
  const { data } = await response.json();
  return { ...data };
};

export default dataMutation;
