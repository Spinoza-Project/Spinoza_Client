import { FruitType } from './FarmDetailType.interface';

export interface ReservationType {
  _id: string;
  fruitType: FruitType;
  price: number;
  reserved: boolean;
}
