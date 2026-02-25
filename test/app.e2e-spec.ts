import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Dashboard Aggregator SLA Verification (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  it('should meet the production performance and reliability requirements', async () => {
    const userId = 'candidate_test_id';
    const iterations = 10;
    const results = [];

    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      const response = await request(app.getHttpServer()).get(`/dashboard/${userId}`);
      const duration = Date.now() - start;

      results.push({ status: response.status, body: response.body, duration });
    }

    // 1. Availability check
    const allSuccessful = results.every(r => r.status === 200);
    if (!allSuccessful) {
      throw new Error(`Reliability Failure: Detected non-200 responses. The system must handle upstream errors gracefully.`);
    }

    // 2. Data Contract check
    results.forEach(r => {
      expect(r.body).toMatchObject({ user: { id: userId, name: 'Alice' } });
      expect(Array.isArray(r.body.orders)).toBe(true);
      expect(Array.isArray(r.body.recommendations)).toBe(true);
    });

    // 3. Latency Check (SLA)
    // We isolate requests that hit the "OK" path for Recommendations (500ms mock)
    // to verify if the implementation is optimized.
    const optimizedSamples = results.filter(r => 
      r.duration < 2500 && 
      r.body.recommendations.length > 0
    );

    if (optimizedSamples.length > 0) {
      // If it takes > 750ms, it implies a sequential bottleneck (100+200+500 = 800ms)
      const unoptimizedRequests = optimizedSamples.filter(r => r.duration > 750);
      if (unoptimizedRequests.length > 0) {
        throw new Error(`SLA Violation: Unnecessary latency detected (avg ${unoptimizedRequests[0].duration}ms). The implementation must not introduce cumulative delays from upstream dependencies.`);
      }
    }

    // 4. Performance Logging
    const highLatencyRequests = results.filter(r => r.duration > 2000);
    if (highLatencyRequests.length > 0) {
      console.log(`[LOG] High latency detected in ${highLatencyRequests.length} requests. Investigating timeout handling...`);
    }
  }, 45000);
});
