import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../core/database/database.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
