import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
