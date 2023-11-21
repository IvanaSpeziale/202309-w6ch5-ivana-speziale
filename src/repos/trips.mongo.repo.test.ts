import { TripsMongoRepo } from './trips.mongo.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new TripsMongoRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
    test('Then getById should return an object under an id', async () => {
      const result = await repo.getById('1');
      expect(result).toStrictEqual({ id: '1', name: 'Test' });
    });
  });
});

describe('Given TasksMongoRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new TripsMongoRepo();

    test('Then getAll should return trips from the file', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });

    test('Then getById should return an object under an id', async () => {
      const result = await repo.getById('1');
      expect(result).toStrictEqual({ id: '1', name: 'Test' });
    });
  });
});
