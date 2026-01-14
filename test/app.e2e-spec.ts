import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/dashboard/:id (GET) should return aggregated data', async () => {
    const userId = '123';

    const response = await request(app.getHttpServer())
      .get(`/dashboard/${userId}`)
      .expect(200);

    expect(response.body).toHaveProperty('userId', userId);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('orders');

    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });
});
