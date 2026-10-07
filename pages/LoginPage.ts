import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
