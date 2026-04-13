# Test Cases - Login Feature

## TC-LOGIN-001 - Successful login with valid credentials

**Type:** Functional  
**Priority:** High  
**Description:** Validate that a registered user can log in successfully with valid credentials.

**Preconditions:**
- The user account exists.
- The login page is available.

**BDD:**
- **Given** the user is on the login page
- **When** the user enters valid credentials
- **Then** the system should allow access and redirect the user to the home page

**Test Steps:**
1. Open the login page.
2. Enter a valid email or username.
3. Enter the correct password.
4. Click the login button.
5. Verify the redirection after login.

**Expected Result:**
- The user is authenticated successfully.
- The system redirects the user to the expected page.

---

## TC-LOGIN-002 - Unsuccessful login with invalid password

**Type:** Negative  
**Priority:** High  
**Description:** Validate that the system shows an error when the user enters an invalid password.

**Preconditions:**
- The user account exists.
- The login page is available.

**BDD:**
- **Given** the user is on the login page
- **When** the user enters a valid username and an invalid password
- **Then** the system should deny access and display an error message

**Test Steps:**
1. Open the login page.
2. Enter a valid email or username.
3. Enter an invalid password.
4. Click the login button.
5. Verify the displayed message.

**Expected Result:**
- Access is denied.
- A clear validation message is shown to the user.
