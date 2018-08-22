import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/modules/app.module';

describe('AuthController (e2e)', () => {
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

  it('/POST /token', async () => {
    // Bad credentials
    const wrongPayload = { user: 'pablo', passw: 'picasso' };
    await request(server)
      .post('/auth/token')
      .send(wrongPayload)
      .expect(HttpStatus.BAD_REQUEST);

    // Good credentials
    const payload = { username: 'pablo', password: 'picasso' };
    await request(server)
      .post('/auth/token')
      .send(payload)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => expect(body.authorization).toBeDefined());
  });

  afterAll(async () => {
    await app.close();
  });
});
