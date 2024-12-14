import { Request } from "express";

export interface CustomBodyRequest<T> extends Request {
  body: T;
}
