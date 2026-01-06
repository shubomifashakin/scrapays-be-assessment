import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async verify(token: string) {
    const issuer = this.configService.get<string>('JWT_ISSUER')!;
    const jwks = createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`));

    const { payload } = await jwtVerify(token, jwks, {
      issuer: this.configService.get<string>('JWT_ISSUER')!,
      audience: this.configService.get<string>('JWT_AUDIENCE')!,
      algorithms: ['RS256'],
    });

    return payload;
  }
}
