/* import { Request, Response } from 'express';
import { TripsController } from './trips.controller';
import { TripsFileRepo } from '../repos/trips.file.repo';
import { mock } from 'node:test';

describe('Given TasksController class', () => {
  let controller: TripsController;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockrepo: TripsFileRepo;
  let mockNext: jest.Mock;
  beforeEach(() => {
    const mockrepo = {
      getAll: jest.fn().mockResolvedValue([{}]),
      getById: jest.fn(),
    } as unknown as TripsFileRepo;

    controller = new TripsController(mockrepo);

    mockRequest = {
      body: {},
    } as Request;

    mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    mockNext = jest.fn();
  });
  describe('When we instantiate it', () => {
    let controller: TripsController;
    let mockRequest: Request;
    let mockResponse: Response;
    let mockrepo: TripsFileRepo;
    let mockNext: jest.Mock;

    beforeEach(() => {
      const mockrepo = {
        getAll: jest.fn().mockResolvedValue([{}]),
        getById: jest.fn(),
      } as unknown as TripsFileRepo;

      controller = new TripsController(mockrepo);

      mockRequest = {
        body: {},
      } as Request;

      mockResponse = {
        json: jest.fn(),
      } as unknown as Response;

      mockNext = jest.fn();
    });

    test('Then getAll should ...', async () => {
      TripsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);
      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getById should ...', async () => {
      TripsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When we instanciate it with errors', (): void => {
    beforeEach(() => {
      const mockError = new Error('Mock error');
      const mockRepo = {
        getById: jest.fn().mockRejectedValue(mockError),
      } as unknown as TripsFileRepo;

      controller = new TripsController(mockError);
    });
    test('', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
 */
