import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaKnownErrorFilter } from './common/filters/prisma-known-error.filter';
import { PrismaUnknownErrorFilter } from './common/filters/prisma-unknown-error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  app.use(cookieParser());

  app.set('trust proxy', true);

  app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaKnownErrorFilter());
  app.useGlobalFilters(new PrismaUnknownErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
