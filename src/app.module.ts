import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { validateConfig } from './common/utils';

import { JwtModule } from './core/jwt/jwt.module';
import { DatabaseModule } from './core/database/database.module';

import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate(config) {
        validateConfig(config);

        return config;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      autoSchemaFile: true,
    }),
    DatabaseModule,
    JwtModule,
    BooksModule,
  ],
})
export class AppModule {}
