// src/lib/jwt.ts
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types/jwt';

export function verifyToken(token: string): Promise<JWTPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JWTPayload);
    });
  });
}