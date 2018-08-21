import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AuthService } from '../auth/auth.service';
// @TODO Find a better way to import Credential
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from '../auth/credential.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  providers: [ConfigService, AuthService],
  exports: [ConfigService, AuthService],
})
export class GlobalModule {}
