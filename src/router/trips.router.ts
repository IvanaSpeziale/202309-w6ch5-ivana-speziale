import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/trips.controller.js';

export const tripsRouter = createRouter();

tripsRouter.get('/', getAll);
tripsRouter.get('/:id', getById);
tripsRouter.post('/', create);
tripsRouter.patch('/:id', update);
tripsRouter.delete('/:id', remove);

const express = require('express');
const tripController = require('./trips.controller');

const router = express.Router();

router.get('/things', tripController.getTrips);
router.get('/things/:id', tripController.getTripById);
router.delete('/things/:id', tripController.deleteTrip);
router.post('/things', tripController.addTrip);
router.patch('/things/:id', tripController.updateTrip);

module.exports = router;
