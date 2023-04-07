import axios from 'axios';

export const getService = async (url) => {
  try {
    const res = axios.get(url);
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
};
