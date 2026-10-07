import { test as base } from '@playwright/test';
import { Header } from '../components/Header';
import { CartPage } from '../pages/CartPage';
import { CategoryPage } from '../pages/CategoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';
import { WishlistPage } from '../pages/WishlistPage';

interface ShopFixtures {
  header: Header;
  cartPage: CartPage;
  categoryPage: CategoryPage;
  checkoutPage: CheckoutPage;
  loginPage: LoginPage;
  productPage: ProductPage;
  registerPage: RegisterPage;
  searchPage: SearchPage;
  wishlistPage: WishlistPage;
}

export const test = base.extend<ShopFixtures>({
  header: async ({ page }, use) => use(new Header(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  categoryPage: async ({ page }, use) => use(new CategoryPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  searchPage: async ({ page }, use) => use(new SearchPage(page)),
  wishlistPage: async ({ page }, use) => use(new WishlistPage(page)),
});

export { expect } from '@playwright/test';
