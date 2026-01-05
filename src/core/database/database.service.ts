import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../../../generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({
      adapter: new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL || 'file:./dev.db',
      }),
      transactionOptions: { maxWait: 5000, timeout: 10000 },
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
