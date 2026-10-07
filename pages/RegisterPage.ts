import type { Page } from '@playwright/test';
import type { TestUser } from '../utils/dataFactory';

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(user: TestUser): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name:' }).fill(user.firstName);
    await this.page.getByRole('textbox', { name: 'Last name:' }).fill(user.lastName);
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(user.email);
    await this.page.getByRole('textbox', { name: 'Password:', exact: true }).fill(user.password);
    await this.page.getByRole('textbox', { name: 'Confirm password:' }).fill(user.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }
}
