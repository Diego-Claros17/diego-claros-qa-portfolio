# Test Cases - Checkout Flow

## TC-CHECKOUT-001 - Add a product to cart successfully

**Type:** Functional  
**Priority:** High  
**Description:** Validate that the user can add a product to the cart from the product listing.

**Preconditions:**
- The user has access to the product listing.
- At least one product is available.

**BDD:**
- **Given** the user is browsing products
- **When** the user clicks the add to cart button
- **Then** the selected product should appear in the cart

**Test Steps:**
1. Open the product listing page.
2. Select an available product.
3. Click the add to cart button.
4. Open the cart.
5. Verify that the selected product is displayed.

**Expected Result:**
- The product is added to the cart successfully.

---

## TC-CHECKOUT-002 - Validate required fields during checkout

**Type:** Negative  
**Priority:** High  
**Description:** Validate that the checkout form does not continue when mandatory fields are empty.

**Preconditions:**
- The user has at least one product in the cart.
- The checkout page is accessible.

**BDD:**
- **Given** the user is on the checkout page
- **When** the user leaves required fields empty and tries to continue
- **Then** the system should display validation messages and prevent progression

**Test Steps:**
1. Open the cart with at least one product.
2. Proceed to checkout.
3. Leave mandatory fields empty.
4. Click continue.
5. Verify validation feedback.

**Expected Result:**
- The checkout process does not continue.
- Validation messages are displayed for required fields.
