import type { Locator, Page } from '@playwright/test';

export class SearchPage {
  private readonly form: Locator;

  constructor(private readonly page: Page) {
    this.form = page.locator('.search-page');
  }

  async goto(): Promise<void> {
    await this.page.goto('/search');
  }

  async search(keyword: string): Promise<void> {
    await this.form.getByRole('textbox', { name: 'Search keyword:' }).fill(keyword);
    await this.form.getByRole('button', { name: 'Search' }).click();
  }

  async advancedSearch(keyword: string, category: string): Promise<void> {
    await this.form.getByRole('textbox', { name: 'Search keyword:' }).fill(keyword);
    await this.form.getByRole('checkbox', { name: 'Advanced search' }).check();
    await this.form.getByRole('combobox', { name: 'Category:' }).selectOption({ label: category });
    await this.form.getByRole('button', { name: 'Search' }).click();
  }
}
