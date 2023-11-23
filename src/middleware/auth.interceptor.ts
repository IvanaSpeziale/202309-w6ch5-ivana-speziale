import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth';
import { HttpError } from '../types/http.error';
import { TripsMongoRepo } from '../repos/trips.mongo.repo';
const debug = createDebug('w7E:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }
  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];
      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.id = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }
  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      //eres el usuario
      const userID = req.body.id;
      //quieres actuar sobre la nata
      const tripsID = req.params.id;

      const repoTrips = new TripsMongoRepo();
      const trip = await repoTrips.getById(tripsID);

      if (trip.author.id !== userID)
        throw new HttpError(401, 'Unauthorized', 'user not valid');

      next();
    } catch (error) {
      next(error);
    }
  }
}
