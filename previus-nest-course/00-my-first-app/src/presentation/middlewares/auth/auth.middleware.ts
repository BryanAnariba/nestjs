import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const {authorization} = req.headers;
    if (!authorization) throw new HttpException('Token no provided', HttpStatus.UNAUTHORIZED);
    next();
  }
}
