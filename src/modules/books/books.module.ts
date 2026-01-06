import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

import { JwtModule } from '../../core/jwt/jwt.module';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
