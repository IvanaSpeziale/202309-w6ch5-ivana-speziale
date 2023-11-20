import fs from 'fs/promises';
import { Trip } from '../entities/trip.model';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:trips:file:repo');

export class TripsFileRepo implements Repository<Trip> {
  file: string;
  trips: Trip[];
  constructor() {
    debug('Instantiated');
    this.file = './data/data.json';
    this.trips = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.trips = JSON.parse(data);
  }

  async getAll(): Promise<Trip[]> {
    return this.trips;
  }

  async getById(id: string): Promise<Trip> {
    const result = this.trips.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Trip, 'id'>): Promise<Trip> {
    const result: Trip = { ...newItem, id: crypto.randomUUID() };
    const newTrips = [...this.trips, result];
    await this.save(newTrips as Trip[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Trip>): Promise<Trip> {
    let result = this.trips.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Trip;
    const newTrips = this.trips.map((item) => (item.id === id ? result : item));
    await this.save(newTrips as Trip[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTrips = this.trips.filter((item) => item.id !== id);
    if (newTrips.length === this.trips.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTrips);
  }

  private async save(newTrips: Trip[]) {
    await fs.writeFile(this.file, JSON.stringify(newTrips), {
      encoding: 'utf-8',
    });
    this.trips = newTrips;
  }
}
