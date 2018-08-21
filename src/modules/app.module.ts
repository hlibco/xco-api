import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule.forRoot(),
    AuthModule,
    ProviderModule,
    UserModule,
  ],
})
export class AppModule {}
