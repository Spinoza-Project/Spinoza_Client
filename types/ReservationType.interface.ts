import { FruitType } from './FarmDetailType.interface';

export interface ReservationType {
  fruitType: FruitType;
  price: number;
  reserved: boolean;
}
