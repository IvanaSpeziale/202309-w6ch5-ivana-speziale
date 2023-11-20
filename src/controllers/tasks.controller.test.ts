import { Request, Response } from 'express';
import { TripsController } from './trips.controller';
import { TripsFileRepo } from '../repos/trips.file.repo';

describe('Given TasksController class', () => {
  describe('When we instantiate it', () => {
    test('Then getAll should ...', async () => {
      TripsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new TripsController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });
});
