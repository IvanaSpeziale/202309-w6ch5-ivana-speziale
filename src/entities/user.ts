import { Trip } from './trip.model';

export type LoginUser = {
  email: string;
  passwd: string;
};
export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  trips: Trip[];
};
