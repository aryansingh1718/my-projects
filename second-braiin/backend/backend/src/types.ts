// types.d.ts or types/express.d.ts
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  username?: string;
  userId?: string;
}
