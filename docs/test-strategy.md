# Test strategy

## Priorities

| Priority | Business risk | Selected coverage |
| --- | --- | --- |
| P0 | A customer cannot enter the shop, find an item or place an order. | Registration/login, catalog discovery, search, add to cart, cart arithmetic and guest checkout. |
| P1 | Supporting shopping behavior is incorrect. | Sorting, price filtering, wishlist conversion, recently viewed and compare. |
| P2 | Lower-value content is incorrect. | Newsletter, poll, tags, reviews and informational pages are intentionally excluded. |

## Test shape

- Feature specs make one business claim at a time. Cross-feature workflows live in `tests/e2e/`.
- Every Playwright test gets its own browser context. Tests create their own cart, wishlist or account state, and never rely on another spec's output.
- Page Objects own navigation, locators and meaningful actions. Specs own expected outcomes. Shared header and product-card behavior lives in components.
- Use semantic locators first; scope repeated product controls to a product card or cart row. A small number of stable application IDs/classes are used where visible labels are absent.
- Use `@smoke`, `@regression` and `@e2e` as executable suite filters. Domain tags make focused runs possible.
- CI runs the Chromium smoke suite on push and pull request. Full regression and E2E runs are available locally and via manual workflow dispatch.
- Public demo data can change. Stable product examples are centralized in `data/products.ts`; failures retain screenshots and traces for diagnosis.

## Boundaries

- No shared permanent customer credentials or committed authentication state.
- No arbitrary sleeps, ordering dependency, hidden purchase setup in hooks or real payment card data.
- A successful Cash On Delivery order is a test order on the public demo site. Avoid running the E2E suite at high concurrency.
