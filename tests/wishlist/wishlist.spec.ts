import { test, expect } from '../../fixtures/testFixtures';
import { products } from '../../data/products';

test('configured gift card can be wishlisted and removed @regression @wishlist', async ({ page, header, productPage, wishlistPage }) => {
  await productPage.goto(products.giftCard.slug);
  await productPage.configureGiftCard();
  await productPage.addToWishlist();
  await expect(header.wishlistLink).toContainText('(1)');

  await wishlistPage.goto();
  await expect(wishlistPage.rowFor(products.giftCard.name)).toBeVisible();
  await wishlistPage.remove(products.giftCard.name);
  await expect(page.getByText('The wishlist is empty!')).toBeVisible();
  await expect(header.wishlistLink).toContainText('(0)');
});
