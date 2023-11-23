import { User } from './user';

export type Trip = {
  id: string;
  author: User;
  placeName: string;
  description: string;
  location: string;
  season: string;
};
