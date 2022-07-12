import axios from 'axios';

export const getSignin = async (email: string, password: string) => {
  return await axios.post('/api/user/signin', {
    email: email,
    password: password,
  });
};
export const getPlants = async () => {
  const { data } = await axios.get('/api/plant');
  return data;
};

export const getPlantFeed = async (plantId: string) => {
  const { data } = await axios.get(`/api/plant/${plantId}/feed`);
  return data;
};

export const getFarms = async (fruit: string, address: string) => {
  const { data } = await axios.get(
    `/api/farm?fruit=${fruit}&address=${address}`
  );
  return data;
};

export const getFarmDetail = async (farmId: string) => {
  const { data } = await axios.get(`/api/farm/${farmId}`);
  return data;
};

export const getReservations = async (farmId: string) => {
  const { data } = await axios.get(`/api/farm/${farmId}/reservation`);
  return data;
};

export const postReservation = async (farmId: string) => {
  return await axios.post('/api/plant', { farmId });
};
