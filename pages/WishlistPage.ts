import type { Page } from '@playwright/test';

export class WishlistPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/wishlist');
  }

  rowFor(productName: string) {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.rowFor(productName).locator('input[name="addtocart"]').check();
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async remove(productName: string): Promise<void> {
    await this.rowFor(productName).locator('input[name="removefromcart"]').check();
    await this.page.getByRole('button', { name: 'Update wishlist' }).click();
  }
}
