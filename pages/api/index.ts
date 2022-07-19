import axios from 'axios';

export const getPlants = async () => {
  const { data } = await axios.get('/api/user/plant');
  return data;
};

export const getFarms = async (fruit: string, address: string) => {
  const { data } = await axios.get(
    `/api/user/farm?fruit=${fruit}&address=${address}`
  );
  return data;
};

export const getFarmDetail = async (farmId: string) => {
  const { data } = await axios.get(`/api/user/farm/${farmId}`);
  return data;
};

export const postReservation = async (reservationId: string) => {
  return await axios.post('/api/user/plant', { reservationId });
};

export const getTourList = async () => {
  return await axios.get('/api/user/farm/tour');
};
