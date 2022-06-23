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
