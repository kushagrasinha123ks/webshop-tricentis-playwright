import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';
import { parsePrice } from '../../utils/prices';

test('cart quantity changes line total and removal clears it @smoke @regression @cart', async ({ page, header, productPage, cartPage }) => {
  await productPage.goto(products.fiction.slug);
  await productPage.addToCart();
  await expect(header.cartLink).toContainText('(1)');
  await cartPage.goto();

  const row = cartPage.rowFor(products.fiction.name);
  await expect(row).toBeVisible();
  const unitPrice = parsePrice(await row.locator('.product-unit-price').innerText());
  await cartPage.setQuantity(products.fiction.name, 2);
  await expect(row.locator('.product-subtotal')).toHaveText((unitPrice * 2).toFixed(2));
  await expect(header.cartLink).toContainText('(2)');

  await cartPage.remove(products.fiction.name);
  await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
  await expect(header.cartLink).toContainText('(0)');
});

test('new context starts with an empty cart @regression @cart', async ({ page, cartPage }) => {
  await cartPage.goto();
  await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
});
