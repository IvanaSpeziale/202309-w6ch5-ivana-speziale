import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import createDebug from 'debug';
import { User } from '../entities/user.js';

const debug = createDebug('w7E:auth');

type TokenPayload = {
  id: User['id'];
  email: string;
} & jwt.JwtPayload;

export abstract class Auth {
  static secret = process.env.JWT_SECRET;
  static hash(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }

  static signJWT(payload: TokenPayload) {
    return jwt.sign(payload, Auth.secret!);
  }
}
