import { Injectable } from '@nestjs/common';

// --- MOCK SERVICES (Do Not Edit) ---
// Fast Service
const getUserProfile = async (id: string) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: 'Alice' }), 100),
  );

// Medium Service
const getRecentOrders = async (id: string) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ item: 'Keyboard' }]), 200),
  );

// Unstable Service
const getRecommendations = async (id: string) =>
  new Promise((resolve, reject) => {
    const r = Math.random();
    // 30% Error
    if (r < 0.3) {
      setTimeout(() => reject(new Error('Service Fail')), 100);
    }
    // 30% Slow (Timeout simulation)
    // Note: Adjusted strictly to document logic (r < 0.6 covers the next 30%)
    else if (r < 0.6) {
      setTimeout(() => resolve([]), 3000);
    }
    // 40% OK
    else {
      setTimeout(() => resolve([{ item: 'Monitor' }]), 500);
    }
  });

@Injectable()
export class AppService {
  // --- TASK START ---
  // Candidate writes code here...
  // Goal: Aggregate the 3 services above.
  async getDashboard(userId: string): Promise<any> {
    // TODO: Implement your logic here

    return {
      message: 'Not implemented yet',
      userId,
    };
  }
}
