import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/modules/app.module';

describe('ProviderController (e2e)', () => {
  let server;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it('/POST /providers', async () => {
    // Without authorization
    await request(server)
      .get('/providers')
      .expect(HttpStatus.UNAUTHORIZED);

    // With an invalid authorization
    await request(server)
      .get('/providers')
      .auth('invalid authorization', { type: 'bearer' })
      .expect(HttpStatus.UNAUTHORIZED);

    // Login
    const payload = { username: 'pablo', password: 'picasso' };
    const result = await request(server)
      .post('/auth/token')
      .send(payload)
      .expect(HttpStatus.CREATED);
    const authorization = result.body.authorization;

    // With authorization
    await request(server)
      .get('/providers')
      .auth(authorization, { type: 'bearer' })
      .expect(HttpStatus.OK);
    // .then(({ body }) => expect(body.authorization).toBeDefined());
  });

  afterAll(async () => {
    await app.close();
  });
});
