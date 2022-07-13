import { TourType } from './TourType.interface';

export interface FarmDetailType {
  farmId: string;
  farmName: string;
  address: string;
  phoneNumber: string;
  grade: number;
  tours: TourType[];
  fruitTypes: FruitType[];
  hashTags: string[];
  introduction: string;
  images: string[];
}

export interface FruitType {
  _id: string;
  name: string;
  information: string;
  image: string;
}
