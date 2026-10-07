import { randomUUID } from 'node:crypto';

export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function createUser(): TestUser {
  return {
    firstName: 'QA',
    lastName: 'Shopper',
    email: `qa-${Date.now()}-${randomUUID().slice(0, 8)}@example.com`,
    password: `Qa!${randomUUID().replaceAll('-', '').slice(0, 12)}`,
  };
}
