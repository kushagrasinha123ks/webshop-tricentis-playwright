# Test case traceability

The table maps each automated scenario to a business priority. `@regression` selects focused feature coverage; `@e2e` selects cross-feature workflows. The final order submission case is opt-in.

| ID | Feature | Scenario | Priority | Type | Automation | Tag |
| --- | --- | --- | --- | --- | --- | --- |
| AUTH-001 | Registration | New customer registers | P0 | Positive | Automated | `@smoke @regression` |
| AUTH-002 | Registration | Required details are validated | P1 | Negative | Automated | `@regression` |
| AUTH-003 | Login | Self-created customer logs in and out | P0 | Positive | Automated | `@smoke @regression` |
| AUTH-004 | Login | Unknown customer is rejected | P1 | Negative | Automated | `@regression` |
| CAT-001 | Catalog | Home to category to product | P0 | Positive | Automated | `@smoke @regression` |
| CAT-002 | Catalog | Sort by effective price | P1 | Positive | Automated | `@regression` |
| CAT-003 | Catalog | Price band constrains results | P1 | Positive | Automated | `@regression` |
| SRCH-001 | Search | Header search finds a book | P0 | Positive | Automated | `@smoke @regression` |
| SRCH-002 | Search | Unknown keyword has no results | P1 | Negative | Automated | `@regression` |
| SRCH-003 | Search | Advanced search uses a category | P1 | Positive | Automated | `@regression` |
| CART-001 | Cart | Add, update quantity, verify total and remove | P0 | Positive | Automated | `@smoke @regression` |
| CART-002 | Cart | Fresh context has an empty cart | P1 | State | Automated | `@regression` |
| WISH-001 | Wishlist | Configure, add and remove gift card | P1 | Positive | Automated | `@regression` |
| ACCT-001 | Recently viewed | View two products in recent-first order, then clear their cookie | P1 | State | Automated | `@regression` |
| COMP-001 | Compare | Compare and clear two products | P1 | Positive | Automated | `@regression` |
| E2E-001 | Checkout | Guest reaches order review | P0 | E2E | Automated | `@smoke @e2e` |
| E2E-002 | Checkout | Guest submits demo order | P0 | E2E | Opt-in | `@e2e` |
| E2E-003 | Wishlist | Wishlist item moves to cart | P1 | E2E | Automated | `@e2e` |
