import { NextFunction, Request, Response } from 'express';
import { TripsFileRepo } from '../repos/trips.file.repo.js';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Trip } from '../entities/trip.model.js';

const debug = createDebug('W7E:tasks:controller');

export class TripsController {
  constructor(private repo: Repository<Trip>) {
    debug('Instantiated');
    this.repo = new TripsFileRepo();
  }

  async getAll(_req: Request, res: Response) {
    const result = await this.repo.getAll();
    res.json(result);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  search = (_req: Request, _res: Response) => {};

  async create(req: Request, res: Response) {
    const result = await this.repo.create(req.body);
    res.status(201);
    res.statusMessage = 'Created';
    res.json(result);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.status(200);
      res.statusMessage = 'ok';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      next(error);
    }
  }
}
