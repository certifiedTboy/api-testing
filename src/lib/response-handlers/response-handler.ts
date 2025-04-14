import { Response } from "express";

export class ResponseHandler {
  static ok(res: Response, statusCode: number, message: string, data: any) {
    return res.status(statusCode).json({ message, data });
  }
}
