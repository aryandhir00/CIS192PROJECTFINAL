import { Request, Response, NextFunction } from 'express';

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, import/prefer-default-export */
export function isAuthenticated(req, res, next: NextFunction) {
  if (req.session! && req.session!.username && req.session!.username !== '') {
    next();
  } else {
    const error = new Error('Authentication failed');
    next(error);
  }
}