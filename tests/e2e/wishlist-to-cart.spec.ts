import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('wishlist selection converts into a cart item @e2e @wishlist @cart', async ({ header, productPage, wishlistPage, cartPage }) => {
  await productPage.goto(products.giftCard.slug);
  await productPage.configureGiftCard();
  await productPage.addToWishlist();
  await expect(header.wishlistLink).toContainText('(1)');

  await wishlistPage.goto();
  await expect(wishlistPage.rowFor(products.giftCard.name)).toBeVisible();
  await wishlistPage.addProductToCart(products.giftCard.name);
  await expect(header.cartLink).toContainText('(1)');
  await cartPage.goto();
  await expect(cartPage.rowFor(products.giftCard.name)).toBeVisible();
});
