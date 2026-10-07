import { test, expect } from '../../fixtures/testFixtures';
import { createUser } from '../../utils/dataFactory';

test('new customer can register @smoke @regression @auth', async ({ page, registerPage }) => {
  const user = createUser();
  await registerPage.goto();
  await registerPage.register(user);

  await expect(page.getByText('Your registration completed')).toBeVisible();
  await expect(page.getByRole('link', { name: user.email })).toBeVisible();
});

test('registration requires personal details @regression @auth', async ({ page, registerPage }) => {
  await registerPage.goto();
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('First name is required.')).toBeVisible();
  await expect(page.getByText('Last name is required.')).toBeVisible();
  await expect(page.getByText('Email is required.')).toBeVisible();
});
