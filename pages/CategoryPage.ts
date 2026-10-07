import type { Page } from '@playwright/test';
import { ProductCard } from '../components/ProductCard';

export class CategoryPage {
  constructor(private readonly page: Page) {}

  async goto(slug: string): Promise<void> {
    await this.page.goto(slug);
  }

  get cards() {
    return this.page.locator('.product-item');
  }

  cardNamed(name: string): ProductCard {
    return new ProductCard(this.cards.filter({ has: this.page.getByRole('link', { name, exact: true }) }));
  }

  async chooseSort(label: string): Promise<void> {
    await this.page.locator('#products-orderby').selectOption({ label });
    await this.page.waitForURL(/orderby=/);
  }

  async prices(): Promise<number[]> {
    const cards = await this.cards.all();
    return Promise.all(cards.map((card) => new ProductCard(card).effectivePrice()));
  }

  async filterPrice(label: string): Promise<void> {
    await this.page.getByRole('link', { name: label, exact: true }).click();
  }
}
