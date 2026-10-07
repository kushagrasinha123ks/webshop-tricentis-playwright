import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('customer can navigate from home to a product @smoke @regression @catalog', async ({ page, header, categoryPage }) => {
  await page.goto('/');
  await header.openCategory('Books');
  await expect(page.getByRole('heading', { name: 'Books', level: 1 })).toBeVisible();
  await categoryPage.cardNamed(products.fiction.name).open();
  await expect(page.getByRole('heading', { name: products.fiction.name, level: 1 })).toBeVisible();
});

test('price sort orders displayed effective prices @regression @catalog', async ({ categoryPage }) => {
  await categoryPage.goto('/books');
  await categoryPage.chooseSort('Price: Low to High');
  const prices = await categoryPage.prices();

  expect(prices.length).toBeGreaterThan(1);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('price filter constrains every displayed effective price @regression @catalog', async ({ categoryPage }) => {
  await categoryPage.goto('/books');
  await categoryPage.filterPrice('Under 25.00');
  const prices = await categoryPage.prices();

  expect(prices.length).toBeGreaterThan(0);
  expect(prices.every((price) => price < 25)).toBe(true);
});
