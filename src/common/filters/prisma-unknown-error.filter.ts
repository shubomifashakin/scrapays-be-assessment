import { ExceptionFilter, Catch } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/client';
import { Logger } from '@nestjs/common';

@Catch(PrismaClientUnknownRequestError)
export class PrismaUnknownErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaUnknownErrorFilter.name);

  catch(exception: PrismaClientUnknownRequestError) {
    this.logger.error('Prisma unknown error:', exception);

    return new InternalServerErrorException('Internal server error');
  }
}
