import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { JwtService } from '../../core/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const gqlCtx = GqlExecutionContext.create(context);
      const req = gqlCtx.getContext().req as Request;

      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn('No token provided');

        return false;
      }

      const payload = await this.jwtService.verify(token);

      req.user = payload;
      return true;
    } catch (error) {
      this.logger.error('Auth error:', error);
      return false;
    }
  }
}
