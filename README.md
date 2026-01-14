# BFF Dashboard Aggregator (WIP)

![Stage](https://img.shields.io/badge/stage-alpha-yellow)
![Priority](https://img.shields.io/badge/priority-critical-red)

## Ticket: BK-2049

### Context

We are migrating the legacy monolithic dashboard to a new NestJS BFF (Backend for Frontend) layer. The goal is to aggregate data from our three microservices (`User`, `Orders`, `Recs`) into a single response payload for the mobile app.

The upstream service stubs are already implemented in `src/app.service.ts` to simulate production latency, but the aggregation logic is missing.

### The Objective

Complete the `getDashboard(userId)` method. The mobile team is complaining about latency, so we need to optimize how we fetch this data.

### Acceptance Criteria (AC)

**1. SLA Requirements (Performance)**

- The goal is to load the dashboard as fast as possible.
- **Ideally, it should return within 1 second**, but accuracy for critical data (User/Orders) is the priority.
- _Current Issue:_ Fetching sequentially is taking too long. We need to parallelize where possible.

**2. Fault Tolerance**

- The `Recommendation Service` is currently unstable (flaky 30% of the time) and sometimes hangs.
- **Requirement:** If Recommendations fail or are too slow, **DO NOT** error out the whole request. Just return an empty array `[]` for recommendations so the user still sees their Profile and Orders.

**3. Code Quality**

- Refactor the implementation into a clean, maintainable structure.
- Use proper Interfaces/DTOs.

### Developer Notes

- **Environment:** The repository is configured for CodeSandbox. The server auto-starts on port 3000.
- **Testing:** We have included an e2e test suite. Run `npm test:e2e` to verify your implementation meets the basic contract.
- **Constraints:** The `MOCK SERVICES` block in `app.service.ts` is simulating the behavior of the legacy Java backend. **Do not modify the mocks**, as we need to benchmark against their current performance characteristics.

---

_Generated from Jira Ticket BK-2049_
