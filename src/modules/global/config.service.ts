import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { OnModuleInit, Injectable } from '@nestjs/common';
import Envstore from 'envstore';

export interface EnvConfig {
  [prop: string]: string;
}

export interface DbConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

@Injectable()
export class ConfigService implements OnModuleInit {
  environment: string;

  uri: string;
  hostname: string;
  port: number;

  db: DbConfig = {} as DbConfig;

  async onModuleInit() {
    const envstore = new Envstore();

    // Setup
    await envstore.setup({
      async development() {
        const local = await dotenv.parse(fs.readFileSync('.env'));
        envstore.merge(local);
      },
      async test() {
        if (process.env.CI) {
          return;
        }
        const local = await dotenv.parse(fs.readFileSync('.env'));
        envstore.merge(local);
      },
    });

    // Setup dynamic configuration
    this.environment = envstore.env;
    this.port = envstore.pick(
      'PORT',
      {
        production: prop => envstore.integer(prop, 3000),
      },
      prop => envstore.integer(prop, 3000),
    );
    this.hostname = envstore.pick(
      'HOSTNAME',
      {
        production: prop => envstore.string(prop, 'api.xcosearch.com'),
      },
      prop => envstore.string(prop, `localhost`),
    );
    this.uri = envstore.pick(
      'URI',
      { production: () => `https://${this.hostname}` },
      () => `http://${this.hostname}:${this.port}`,
    );

    // Database
    this.db.host = envstore.string('DATABASE_HOST');
    this.db.port = envstore.integer('DATABASE_PORT', 3306);
    this.db.database = envstore.string('DATABASE_NAME');
    this.db.username = envstore.string('DATABASE_USERNAME');
    this.db.password = envstore.string('DATABASE_PASSWORD');
  }
}
