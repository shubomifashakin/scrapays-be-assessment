import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../../../generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleDestroy {
  constructor(readonly config: ConfigService) {
    super({
      adapter: new PrismaBetterSqlite3({
        url: config.get<string>('DATABASE_URL')!,
      }),
      transactionOptions: { maxWait: 5000, timeout: 10000 },
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
