import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private JWKS: ReturnType<typeof createRemoteJWKSet>;

  constructor(private readonly configService: ConfigService) {
    const issuer = this.configService.get<string>('JWT_ISSUER')!;

    this.JWKS = createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const gqlCtx = GqlExecutionContext.create(context);
      const req = gqlCtx.getContext().req as Request;

      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn('No token provided');

        return false;
      }

      const { payload } = await jwtVerify(token, this.JWKS, {
        issuer: this.configService.get<string>('JWT_ISSUER')!,
        audience: this.configService.get<string>('JWT_AUDIENCE')!,
        algorithms: ['RS256'],
      });

      req.user = payload;
      return true;
    } catch (error) {
      this.logger.error('Auth error:', error);
      return false;
    }
  }
}
