import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { TripsController } from '../controllers/trips.controller.js';

const debug = createDebug('W7E:tasks:router');

export const tripsRouter = createRouter();
debug('Starting');

const controller = new TripsController();

tripsRouter.get('/', controller.getAll.bind(controller));
tripsRouter.get('/search', controller.search.bind(controller));
tripsRouter.get('/:id', controller.getById.bind(controller));
tripsRouter.post('/', controller.create.bind(controller));
tripsRouter.patch('/:id', controller.update.bind(controller));
tripsRouter.patch('trip/:id', controller.update.bind(controller));
tripsRouter.patch('trip/:id', controller.update.bind(controller));
tripsRouter.delete('/:id', controller.delete.bind(controller));
