import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule.forRoot(),
    AuthModule,
    ProviderModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
