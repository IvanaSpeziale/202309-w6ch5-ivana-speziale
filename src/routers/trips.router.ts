import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { TripsController } from '../controllers/trips.controller.js';
import { TripsMongoRepo } from '../repos/trips.mongo.repo.js';

const debug = createDebug('W7E:tasks:router');

export const tripsRouter = createRouter();
debug('Starting');

const repo = new TripsMongoRepo();
const controller = new TripsController(repo);

tripsRouter.get('/', controller.getAll.bind(controller));
tripsRouter.get('/search', controller.search.bind(controller));
tripsRouter.get('/:id', controller.getById.bind(controller));
tripsRouter.post('/', controller.create.bind(controller));
tripsRouter.patch('/:id', controller.update.bind(controller));
tripsRouter.delete('/:id', controller.delete.bind(controller));
