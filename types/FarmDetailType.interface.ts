export interface FarmDetailType {
  farmId: string;
  farmName: string;
  address: string;
  phoneNumber: string;
  fruitTypes: FruitType[];
  introduction: string;
  images: string[];
}

export interface FruitType {
  _id: string;
  name: string;
  information: string;
  image: string;
}
