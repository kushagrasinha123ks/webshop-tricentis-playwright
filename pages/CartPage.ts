import type { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/cart');
  }

  rowFor(productName: string) {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
  }

  async setQuantity(productName: string, quantity: number): Promise<void> {
    await this.rowFor(productName).getByRole('textbox').fill(String(quantity));
    await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
  }

  async remove(productName: string): Promise<void> {
    await this.rowFor(productName).locator('input[name="removefromcart"]').check();
    await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
  }

  async beginCheckout(): Promise<void> {
    await this.page.locator('#termsofservice').check();
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
