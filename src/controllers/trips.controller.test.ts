import { Request, Response } from 'express';
import { TripsController } from './trips.controller';
import { TripsFileRepo } from '../repos/trips.file.repo';
import { TripsMongoRepo } from '../repos/trips.mongo.repo';

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
      mockRequest = {
        body: {},
        params: {},
      } as Request;
      mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        statusMessage: '',
      } as unknown as Response;
      mockNext = jest.fn();
    });

    describe('When we instantiate it without errors', () => {
      beforeEach(() => {
        const mockRepo = {
          getAll: jest.fn().mockResolvedValue([{}]),
          getById: jest.fn().mockResolvedValue({}),
          create: jest.fn().mockResolvedValue({}),
          update: jest.fn().mockResolvedValue({}),
          delete: jest.fn().mockResolvedValue(undefined),
        } as unknown as TripsMongoRepo;

        controller = new TripsController(mockRepo);
      });

      test('Then getAll should...', async () => {
        await controller.getAll(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toHaveBeenCalledWith([{}]);
      });

      test('Then getById should...', async () => {
        await controller.getById(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toHaveBeenCalledWith({});
      });

      test('Then create should...', async () => {
        await controller.create(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.statusMessage).toBe('Created');
        expect(mockResponse.json).toHaveBeenCalledWith({});
      });

      test('Then update should...', async () => {
        await controller.update(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toHaveBeenCalledWith({});
      });

      test('Then delete should...', async () => {
        await controller.delete(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.statusMessage).toBe('No Content');
        expect(mockResponse.json).toHaveBeenCalledWith({});
      });
    });

    describe('When we instantiate it with errors', () => {
      let mockError: Error;

      beforeEach(() => {
        mockError = new Error('Mock error');
        const mockRepo = {
          getAll: jest.fn().mockRejectedValue(mockError),
          getById: jest.fn().mockRejectedValue(mockError),
          create: jest.fn().mockRejectedValue(mockError),
          update: jest.fn().mockRejectedValue(mockError),
          delete: jest.fn().mockRejectedValue(mockError),
        } as unknown as TripsMongoRepo;

        controller = new TripsController(mockRepo);
      });
      test('Then getAll should...', async () => {
        await controller.getAll(mockRequest, mockResponse);
        expect(mockResponse).toHaveBeenCalledWith(mockError);
      });

      test('Then getById should...', async () => {
        await controller.getById(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });

      test('Then create should...', async () => {
        await controller.create(mockRequest, mockResponse);
        expect(mockResponse).toHaveBeenCalledWith(mockError);
      });

      test('Then update should...', async () => {
        await controller.update(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });

      test('Then delete should...', async () => {
        await controller.delete(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    });
  });
});
