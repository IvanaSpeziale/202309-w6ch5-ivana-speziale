import { Schema, model } from 'mongoose';
import { Trip } from '../entities/trip.model';

const tripsSchema = new Schema<Trip>({
  placeName: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
});

export const TripModel = model('Trip', tripsSchema, 'trips'); //collecion o tabla. Estructura donde se guarda la informacion
