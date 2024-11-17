// src/types/global.d.ts
export {};

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
  var verificationCodes: Map<string, {
    code: string;
    expires: number;
  }>;
  var twoFactorCodes: Map<string, {
    code: string;
    expires: number;
  }>;
}