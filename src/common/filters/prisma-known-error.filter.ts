import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Catch(PrismaClientKnownRequestError)
export class PrismaKnownErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaKnownErrorFilter.name);

  catch(exception: PrismaClientKnownRequestError) {
    if (exception.code === 'P2025') {
      return new NotFoundException('Record not found');
    }

    this.logger.error(`Prisma error: ${exception.code} - ${exception.message}`);

    return new InternalServerErrorException('Internal server error');
  }
}
