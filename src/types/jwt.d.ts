// src/types/jwt.d.ts
export interface JWTPayload {
    userId: string;
    iat: number;
    exp: number;
  }
  
  