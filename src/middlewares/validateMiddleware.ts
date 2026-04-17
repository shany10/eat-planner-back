import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";

export function validateMiddleware(schema: {
  body?: ZodObject<ZodRawShape>;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: "Validation failed", issues: err.issues });
      }
      return next(err);
    }
  };
}