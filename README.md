# BFF Dashboard Aggregator (WIP)

![Stage](https://img.shields.io/badge/stage-alpha-yellow)
![Priority](https://img.shields.io/badge/priority-critical-red)

## Ticket: BK-2049

### Context

We are migrating the legacy monolithic dashboard to a new NestJS BFF (Backend for Frontend) layer. The goal is to aggregate data from our three microservices (`User`, `Orders`, `Recommendations`) into a single response payload for the mobile app.

The upstream service stubs are already implemented in `src/app.service.ts` to simulate production latency, but the aggregation logic is missing.

### The Objective

Complete the `getDashboard(userId)` method. The mobile team is complaining about latency, so we need to optimize how we fetch this data.

### Acceptance Criteria (AC)

#### 1. Performance & Latency

- **SLA Requirement:** The mobile team reports that the dashboard feels sluggish. The implementation must be optimized so that the total response time is governed by the slowest upstream dependency (~500ms under normal conditions), not the sum of all dependencies.
- **Service Stability:** The `Recommendation Service` can occasionally take up to 3 seconds to respond. Ideally, the BFF should handle this to keep the user experience responsive.

#### 2. Fault Tolerance

- The `Recommendation Service` is currently unstable (flaky 30% of the time).
- **Requirement:** If Recommendations fail, the request must still succeed. Return an empty array `[]` for recommendations so the user can still see their Profile and Orders.

#### 3. Code Quality

- Refactor the implementation into a clean, maintainable structure.
- Use proper Interfaces/DTOs.

### Developer Notes

- **Environment:** The repository is configured for CodeSandbox. The server auto-starts on port 3000.
- **Testing:** We have included an e2e test suite. Run `npm test:e2e` to verify your implementation meets the basic contract.
- **Constraints:** The `MOCK SERVICES` block in `app.service.ts` is simulating the behavior of the legacy Java backend. **Do not modify the mocks**, as we need to benchmark against their current performance characteristics.

---

_Generated from Jira Ticket BK-2049_
