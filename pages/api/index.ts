import axios from 'axios';

export const getPlants = async () => {
  return await axios.get('/api/plant');
};

export const getPlantFeed = async (plantId: string) => {
  return await axios.get(`/api/plant/${plantId}/feed`);
};

export const getFarms = async (fruit: string, address: string) => {
  return await axios.get(`/api/farm?fruit=${fruit}&address=${address}`);
};

export const getFarmDetail = async (farmId: string) => {
  return await axios.get(`/api/farm/${farmId}`);
};

export const getReservations = async (farmId: string) => {
  return await axios.get(`/api/farm/${farmId}/reservation`);
};

export const postReservation = async (farmId: string) => {
  return await axios.post('/api/plant', { farmId });
};
