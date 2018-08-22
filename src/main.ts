import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './modules/app.module';
import { ConfigService } from './modules/global/config.service';

const debug = require('debug')('xco:main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: ConfigService = await app.get<ConfigService>('ConfigService');
  await config.onModuleInit();

  app.set('json spaces', 2);
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.use(cors());

  // Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('XCO API')
    .setDescription('Back-end of the XCO Project')
    .setVersion('1.0')
    .setHost(config.uri.split('//')[1])
    .setSchemes(config.environment === 'development' ? 'http' : 'https')
    .setBasePath('/')
    .addBearerAuth('authorization', 'header')
    .addTag('API')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, swaggerDoc, {
    swaggerUrl: `${config.uri}/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
  app.use('/docs/swagger.json', (_req, res) => {
    res.send(swaggerDoc);
  });

  await app.listen(config.port);
  debug(`Application is running at ${config.uri}`);
}
bootstrap();
