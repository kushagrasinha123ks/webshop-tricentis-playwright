import type { Locator } from '@playwright/test';
import { parsePrice } from '../utils/prices';

export class ProductCard {
  constructor(readonly root: Locator) {}

  get title() {
    return this.root.locator('.product-title a');
  }

  async effectivePrice(): Promise<number> {
    const sale = this.root.locator('.actual-price');
    const price = await (await sale.count() ? sale : this.root.locator('.price').last()).innerText();
    return parsePrice(price);
  }

  async open(): Promise<void> {
    await this.title.click();
  }
}
