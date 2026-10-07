import { test, expect } from '../../fixtures/testFixtures';
import { createUser } from '../../utils/dataFactory';

test('registered customer can log in and out @smoke @regression @auth', async ({ page, registerPage, loginPage }) => {
  const user = createUser();
  await registerPage.goto();
  await registerPage.register(user);
  await expect(page.getByText('Your registration completed')).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();

  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await expect(page.getByRole('link', { name: user.email })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

test('unknown customer is rejected @regression @auth', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(createUser().email, 'NotARealPassword123!');

  await expect(page.locator('.validation-summary-errors')).toContainText('Login was unsuccessful');
});
