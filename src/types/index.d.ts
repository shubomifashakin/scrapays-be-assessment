import 'express';
import { JWTPayload } from 'jose';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
    user: JWTPayload;
  }
}
