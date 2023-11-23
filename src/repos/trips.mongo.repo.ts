import fs from 'fs/promises';
import { Trip } from '../entities/trip.model.js';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
import { TripModel } from './trips.mongo.model.js';
import { UsersMongoRepo } from './users/users.mongo.repo.js';

const debug = createDebug('W7E:trips:mongo:repo');

export class TripsMongoRepo implements Repository<Trip> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Trip[]> {
    const result = await TripModel.find()
      .populate('author', {
        trips: 0,
      })
      .exec();
    return result;
  }

  async create(newItem: Omit<Trip, 'id'>): Promise<Trip> {
    const userID = newItem.author.id;
    const user = await this.userRepo.getById(userID);
    const result: Trip = await TripModel.create({ ...newItem, author: userID });
    user.trips.push(result);
    await this.userRepo.update(userID, user);
    return result;
  }

  async getById(id: string): Promise<Trip> {
    const result = await TripModel.findById(id)
      .populate('author', {
        trips: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: keyof Trip;
    value: any;
  }): Promise<Trip[]> {
    const result = await TripModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }

  async update(id: string, updatedItem: Partial<Trip>): Promise<Trip> {
    const result = await TripModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', {
        trips: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await TripModel.findByIdAndDelete(id)
      .populate('author', {
        trips: 0,
      })
      .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
