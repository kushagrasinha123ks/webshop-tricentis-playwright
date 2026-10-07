# Feature inventory

Observed on the live Tricentis Demo Web Shop on 2026-10-07. Product availability and prices can change on this public environment.

| Area | Observed behavior | Automation decision |
| --- | --- | --- |
| Global navigation | Header has registration, login, cart and wishlist counters, search, and category links. Footer links expose recently viewed and compare lists. | Cover navigation and counter changes through feature tests. |
| Authentication | Registration requires name, email, password and confirmation. Login has a remember-me option. | Cover valid registration, validation, login, invalid credentials and logout. Generate unique accounts per test. |
| Catalog | Category pages have grid/list view, sort order, page size and, for Books, price bands. Product pages show price, quantity and available actions. | Cover product discovery, effective-price sorting and price-range filtering. |
| Search | Header search and an advanced form exist. Advanced options include category, subcategories, manufacturer, price range and descriptions. | Cover a known result, no results and a representative advanced query. |
| Cart | Adding a product updates the header count. Cart supports quantity updates, remove checkboxes, a subtotal and checkout. | Cover add, quantity arithmetic and removal. |
| Wishlist | The wishlist has its own counter, quantity, remove and add-to-cart controls. The $25 Virtual Gift Card exposes an Add to wishlist action but requires recipient name and email. | Cover the configured gift card and wishlist-to-cart conversion. Do not assume every product can be wishlisted. |
| Recently viewed | A fresh view is empty; opening Fiction makes it appear on the recently viewed page. | Cover appearance and order in an isolated browser context. |
| Compare | Product details expose Add to compare list; the comparison page shows product columns and remove/clear controls. | Cover a two-product comparison. |
| Checkout | Cart requires terms acceptance. An anonymous shopper can choose Checkout as Guest. Checkout proceeds through billing, shipping address, shipping method, payment method, payment information and confirmation. | Cover one guest purchase using the demo site's Cash On Delivery option. |
| Account | My account, orders and addresses links are present. | Defer deeper account management; the purchase journey has higher value. |
| Ancillary content | Newsletter, poll, tags, reviews and footer content are available. | Exclude from the core suite; they do not add much distinct framework or business coverage. |

## Stateful observations

- Cart, wishlist and comparison contents persist across navigation in the same browser context.
- Recently viewed products appear only after a product detail visit. The site creates a `NopCommerce.RecentlyViewedProducts` cookie; removing that cookie and reloading clears the list. The test covers appearance, ordering and reset in a fresh context.
- Product actions vary by SKU. Fiction has cart and compare actions; the virtual gift card also has a wishlist action and requires recipient details.
- Checkout stages load asynchronously. Tests wait for the next visible stage with web-first assertions.
