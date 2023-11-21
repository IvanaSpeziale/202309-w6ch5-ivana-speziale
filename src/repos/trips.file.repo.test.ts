import { TripsFileRepo } from './trips.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new TripsFileRepo();

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

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new TripsFileRepo();

    test('Then getAll should return trips from the file', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });

    test('Then getById should return an object under an id', async () => {
      const result = await repo.getById('1'); // Provide an ID to getById
      expect(result).toStrictEqual({ id: '1', name: 'Test' });
    });

    /*  test('Then create should add a new trip to the file', async () => {
      const newItem = { name: 'New Trip' };
      const result = await repo.create(newItem);
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify([{ ...result }]),
        expect.anything()
      );
      expect(result).toMatchObject({
        ...newItem,
        id: expect.any(String),
      });
      const allTrips = await repo.getAll();
      expect(allTrips).toContainEqual(result);
    });

    test('Then update should modify an existing trip in the file', async () => {
      const updatedItem = { name: 'Updated Trip' };
      const result = await repo.update('1', updatedItem);
      const expected = { id: '1', name: 'Updated Trip' };
      expect(result).toStrictEqual(expected);
    });

    test('Then delete should remove a trip from the file', async () => {
      await repo.delete('1');
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        '[]',
        expect.anything()
      );
    }); */
  });
});
