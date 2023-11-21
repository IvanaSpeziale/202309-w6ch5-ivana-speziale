import { Schema, model } from 'mongoose';
import { Trip } from '../entities/trip.model.js';

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

tripsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const TripModel = model('Trip', tripsSchema, 'trips'); //collecion o tabla. Estructura donde se guarda la informacion
