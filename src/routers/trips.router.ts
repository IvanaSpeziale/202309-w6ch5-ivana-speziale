import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { TripsController } from '../controllers/trips.controller.js';
import { TripsMongoRepo } from '../repos/trips.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('w7E:trips:router');

export const tripsRouter = createRouter();
debug('Starting');

const repo = new TripsMongoRepo();
const controller = new TripsController(repo);
const interceptor = new AuthInterceptor();

tripsRouter.get('/', controller.getAll.bind(controller));
tripsRouter.get('/search', controller.search.bind(controller));
tripsRouter.get('/:id', controller.getById.bind(controller));
tripsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);
tripsRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentication.bind(interceptor),
  controller.update.bind(controller)
);
tripsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentication.bind(interceptor),
  controller.delete.bind(controller)
);
