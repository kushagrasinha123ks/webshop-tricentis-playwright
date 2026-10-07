import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  private readonly product: Locator;

  constructor(private readonly page: Page) {
    this.product = page.locator('.product-essential');
  }

  async goto(slug: string): Promise<void> {
    await this.page.goto(slug);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.product.getByRole('textbox', { name: 'Qty:' }).fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addToCompare(): Promise<void> {
    await this.product.getByRole('button', { name: 'Add to compare list' }).click();
  }

  async configureGiftCard(): Promise<void> {
    await this.product.getByRole('textbox', { name: "Recipient's Name:" }).fill('QA Recipient');
    await this.product.getByRole('textbox', { name: "Recipient's Email:" }).fill('recipient@example.com');
    await this.product.getByRole('textbox', { name: 'Your Name:' }).fill('QA Sender');
    await this.product.getByRole('textbox', { name: 'Your Email:' }).fill('sender@example.com');
  }

  async addToWishlist(): Promise<void> {
    await this.product.getByRole('button', { name: 'Add to wishlist' }).click();
  }
}
