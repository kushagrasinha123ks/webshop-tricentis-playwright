import type { Page } from '@playwright/test';

export class Header {
  constructor(private readonly page: Page) {}

  get cartLink() {
    return this.page.getByRole('link', { name: /Shopping cart \(\d+\)/ });
  }

  get wishlistLink() {
    return this.page.getByRole('link', { name: /Wishlist \(\d+\)/ });
  }

  async searchFor(keyword: string): Promise<void> {
    await this.page.locator('#small-searchterms').fill(keyword);
    await this.page.locator('.search-box').getByRole('button', { name: 'Search' }).click();
  }

  async openCategory(name: string): Promise<void> {
    await this.page.locator('.top-menu').getByRole('link', { name, exact: true }).click();
  }
}
