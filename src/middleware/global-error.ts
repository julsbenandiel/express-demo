import { NextFunction, Request, Response } from "express";

const globalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
  const message: string = err.message
    .toLowerCase()
    .replace("error:", "")
    .trimStart();

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : `🥞: ${err.stack}`,
  });
}

export default globalErrorMiddleware;