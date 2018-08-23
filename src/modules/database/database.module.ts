import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../global/config.service';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    const config = new ConfigService();
    await config.onModuleInit();

    return TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      username: config.db.username,
      password: config.db.password,
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      synchronize: config.environment === 'development' ? true : false,
      logging: config.environment === 'development' ? true : false,
    });
  }
}
