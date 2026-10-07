import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('customer can compare and clear two products @regression @compare', async ({ page, productPage }) => {
  await productPage.goto(products.fiction.slug);
  await productPage.addToCompare();
  await expect(page.getByRole('heading', { name: 'Compare products' })).toBeVisible();

  await productPage.goto(products.healthBook.slug);
  await productPage.addToCompare();
  await expect(page.getByRole('link', { name: products.fiction.name, exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: products.healthBook.name, exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Clear list' }).click();
  await expect(page.getByText('You have no items to compare.')).toBeVisible();
});
