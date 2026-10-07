import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('recently viewed products order and reset with their cookie @regression @account', async ({ page, context, productPage }) => {
  await page.goto('/recentlyviewedproducts');
  await expect(page.locator('.product-item')).toHaveCount(0);

  await productPage.goto(products.fiction.slug);
  await productPage.goto(products.healthBook.slug);
  await page.goto('/recentlyviewedproducts');

  await expect(page.locator('.product-item')).toHaveCount(2);
  const names = await page.locator('.product-item .product-title a').allTextContents();
  expect(names.map((name) => name.trim())).toEqual([products.healthBook.name, products.fiction.name]);

  await context.clearCookies({ name: 'NopCommerce.RecentlyViewedProducts' });
  await page.reload();
  await expect(page.locator('.product-item')).toHaveCount(0);
});
