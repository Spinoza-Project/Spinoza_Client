import axios from 'axios';

export const getPlants = async () => {
  return await axios.get('/api/plant');
};

export const getPlantFeed = async (plantId: string) => {
  return await axios.get(`/api/plant/${plantId}/feed`);
};
