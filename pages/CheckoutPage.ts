import { expect, type Page } from '@playwright/test';
import type { TestUser } from '../utils/dataFactory';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async continueAsGuest(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout as Guest' }).click();
    await expect(this.page.getByRole('heading', { name: 'Billing address' })).toBeVisible();
  }

  async enterBillingAddress(user: TestUser): Promise<void> {
    const step = this.page.locator('#checkout-step-billing');
    await step.getByRole('textbox', { name: 'First name:' }).fill(user.firstName);
    await step.getByRole('textbox', { name: 'Last name:' }).fill(user.lastName);
    await step.getByRole('textbox', { name: 'Email:' }).fill(user.email);
    await step.getByRole('combobox', { name: 'Country:' }).selectOption({ label: 'United States' });
    await step.getByRole('textbox', { name: 'City:' }).fill('New York');
    await step.getByRole('textbox', { name: 'Address 1:' }).fill('1 Test Street');
    await step.getByRole('textbox', { name: 'Zip / postal code:' }).fill('10001');
    await step.getByRole('textbox', { name: 'Phone number:' }).fill('5550100100');
    await step.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('#checkout-step-shipping').getByRole('button', { name: 'Continue' })).toBeVisible();
  }

  async useBillingAddressForShipping(): Promise<void> {
    await this.page.locator('#checkout-step-shipping').getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('#checkout-step-shipping-method').getByRole('radio', { name: /Ground/ })).toBeVisible();
  }

  async chooseGroundShipping(): Promise<void> {
    const step = this.page.locator('#checkout-step-shipping-method');
    await step.getByRole('radio', { name: /Ground/ }).check();
    await step.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('#checkout-step-payment-method').getByRole('radio', { name: /Cash On Delivery/ })).toBeVisible();
  }

  async chooseCashOnDelivery(): Promise<void> {
    const step = this.page.locator('#checkout-step-payment-method');
    await step.getByRole('radio', { name: /Cash On Delivery/ }).check();
    await step.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('#checkout-step-payment-info').getByRole('button', { name: 'Continue' })).toBeVisible();
  }

  async acceptPaymentInformation(): Promise<void> {
    await this.page.locator('#checkout-step-payment-info').getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('#checkout-step-confirm-order').getByRole('button', { name: 'Confirm' })).toBeVisible();
  }

  async confirmOrder(): Promise<void> {
    await this.page.locator('#checkout-step-confirm-order').getByRole('button', { name: 'Confirm' }).click();
  }
}
