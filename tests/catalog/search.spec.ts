import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('header search finds a known product @smoke @regression @search', async ({ page, header }) => {
  await page.goto('/');
  await header.searchFor(products.fiction.name);
  await expect(page.getByRole('heading', { name: products.fiction.name, level: 2, exact: true })).toBeVisible();
});

test('search reports no result for an unknown product @regression @search', async ({ page, searchPage }) => {
  await searchPage.goto();
  await searchPage.search('qa-product-that-does-not-exist-94673');

  await expect(page.locator('.product-item')).toHaveCount(0);
  await expect(page.getByText('No products were found that matched your criteria.')).toBeVisible();
});

test('advanced search limits results to a category @regression @search', async ({ page, searchPage }) => {
  await searchPage.goto();
  await searchPage.advancedSearch('Fiction', 'Books');

  await expect(page.getByRole('heading', { name: 'Fiction', level: 2, exact: true })).toBeVisible();
  await expect(page.locator('.product-item')).not.toHaveCount(0);
});
