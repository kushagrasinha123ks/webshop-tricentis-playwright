import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';
import { createUser } from '../../utils/dataFactory';

test('guest reaches order review with the selected book @smoke @e2e @checkout', async ({ page, header, productPage, cartPage, checkoutPage }) => {
  const guest = createUser();
  await page.goto('/');
  await header.searchFor(products.fiction.name);
  await page.getByRole('heading', { name: products.fiction.name, level: 2, exact: true }).getByRole('link').click();
  await expect(page.getByRole('heading', { name: products.fiction.name, level: 1 })).toBeVisible();
  await productPage.addToCart();
  await expect(header.cartLink).toContainText('(1)');

  await cartPage.goto();
  await expect(cartPage.rowFor(products.fiction.name)).toBeVisible();
  await cartPage.beginCheckout();
  await checkoutPage.continueAsGuest();
  await checkoutPage.enterBillingAddress(guest);
  await checkoutPage.useBillingAddressForShipping();
  await checkoutPage.chooseGroundShipping();
  await checkoutPage.chooseCashOnDelivery();
  await checkoutPage.acceptPaymentInformation();
  await expect(page.locator('#checkout-step-confirm-order')).toContainText(products.fiction.name);
});

test('guest completes a demo order when explicitly enabled @e2e @checkout', async ({ page, header, productPage, cartPage, checkoutPage }) => {
  test.skip(process.env.RUN_ORDER_TESTS !== '1', 'Set RUN_ORDER_TESTS=1 to submit a public demo order.');

  const guest = createUser();
  await page.goto('/');
  await header.searchFor(products.fiction.name);
  await page.getByRole('heading', { name: products.fiction.name, level: 2, exact: true }).getByRole('link').click();
  await productPage.addToCart();
  await expect(header.cartLink).toContainText('(1)');
  await cartPage.goto();
  await cartPage.beginCheckout();
  await checkoutPage.continueAsGuest();
  await checkoutPage.enterBillingAddress(guest);
  await checkoutPage.useBillingAddressForShipping();
  await checkoutPage.chooseGroundShipping();
  await checkoutPage.chooseCashOnDelivery();
  await checkoutPage.acceptPaymentInformation();
  await expect(page.locator('#checkout-step-confirm-order')).toContainText(products.fiction.name);
  await checkoutPage.confirmOrder();

  await expect(page.getByText('Your order has been successfully processed!')).toBeVisible();
});
