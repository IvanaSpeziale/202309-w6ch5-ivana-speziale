import fs from 'fs/promises';
import { Trip } from '../entities/trip.model.js';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
import { TripModel } from './trips.mongo.model.js';

const debug = createDebug('W7E:trips:mongo:repo');

export class TripsMongoRepo implements Repository<Trip> {
  file: string;
  trips: Trip[];
  constructor() {
    debug('Instantiated');
    this.file = './data/db.json';
    this.trips = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.trips = JSON.parse(data);
  }

  async getAll(): Promise<Trip[]> {
    const result = await TripModel.find();
    return result;
  }

  async getById(id: string): Promise<Trip> {
    const result = await TripModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Trip, 'id'>): Promise<Trip> {
    const result: Trip = await TripModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Trip>): Promise<Trip> {
    const result = await TripModel.findByIdAndUpdate(id, updatedItem);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await TripModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
