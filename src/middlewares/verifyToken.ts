import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret: string = process.env.TOKEN_SECRET as string;

// Verify token middleware
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as unknown as string).split(' ')[1];
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      next();
    } else {
      res.status(401).send('Invalid or Expired Token');
    }
  } catch (err) {
    res.status(401).json({ error: `Invalid token: ${err}` });
  }
};
