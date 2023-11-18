import { Request, Response } from 'express';
import fs from 'fs';

const dataFilePath = './api/db.json';
let trips: any[] = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  trips = JSON.parse(rawData).Trips || [];
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
}

export const getAll = (_req: Request, res: Response) => {
  res.json(trips);
};

export const getById = (req: Request, res: Response) => {
  const result = trips.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: trips.length + 1 };
  trips.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = trips.find((item) => Number(item.id) === Number(req.params.id));
  result = { ...result, ...req.body };
  trips[trips.findIndex((item) => item.id === Number(req.params.id))] = result!;
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  trips.splice(
    trips.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  res.json({});
};
