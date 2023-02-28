import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import { UserService } from '../modules/user/user.service';
import type { Request } from '../utils/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AuthMiddleware');

  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.replace('Bearer ', '');

    // If token is not provided, or is invalid, return 401
    if (!token) {
      return next(UnauthorizedError('No access token provided'));
    }

    try {
      const decoded = this.userService.jwtDecodeUser(token);
      const address = decoded['address'];
      const user = await this.userService.findUser(address);

      if (!user) {
        throw new Error('User not found');
      }

      req.user = address;
      req.userId = user.id;
    } catch (error) {
      this.logger.error('JWT decode error: ' + error.message, error);
      return next(UnauthorizedError('Invalid access token'));
    }

    return next();
  }
}
