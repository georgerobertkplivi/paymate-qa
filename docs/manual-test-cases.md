# Manual Test Cases

## Registration Flow

### TC-001: New User Registration
**Priority**: High  
**Description**: Verify new user can register successfully  
**Steps**:
1. Navigate to registration page
2. Fill in valid user details:
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Password
3. Accept terms and conditions
4. Click "Register" button  
**Expected**: User is registered successfully and redirected to dashboard

### TC-002: Duplicate Email Registration
**Priority**: High  
**Description**: Verify system prevents registration with existing email  
**Steps**:
1. Navigate to registration page
2. Enter email of existing user
3. Fill other valid details
4. Click "Register" button  
**Expected**: Error message displayed about email already in use

### TC-003: Password Validation
**Priority**: Medium  
**Description**: Verify password requirements are enforced  
**Steps**:
1. Navigate to registration page
2. Enter valid user details
3. Enter password that doesn't meet requirements:
   - Too short (< 8 characters)
   - No special characters
   - No numbers
4. Click "Register" button  
**Expected**: Appropriate error messages for each password requirement

## Login Flow

### TC-004: Valid Login
**Priority**: High  
**Description**: Verify user can login with valid credentials  
**Steps**:
1. Navigate to login page
2. Enter valid email and password
3. Click "Login" button  
**Expected**: User is logged in and redirected to dashboard

### TC-005: Invalid Login
**Priority**: High  
**Description**: Verify system handles invalid login attempts  
**Steps**:
1. Navigate to login page
2. Enter invalid email/password combinations:
   - Wrong email
   - Wrong password
   - Both wrong
3. Click "Login" button  
**Expected**: Appropriate error message displayed

### TC-006: Remember Me
**Priority**: Low  
**Description**: Verify "Remember Me" functionality  
**Steps**:
1. Navigate to login page
2. Enter valid credentials
3. Check "Remember Me" box
4. Login successfully
5. Close browser
6. Reopen browser and navigate to login page  
**Expected**: Email field is pre-filled

## Send Money Flow

### TC-007: Send Money to Registered User
**Priority**: High  
**Description**: Verify money can be sent to registered user  
**Steps**:
1. Login with valid credentials
2. Navigate to "Send Money"
3. Enter recipient's email
4. Enter amount
5. Add note (optional)
6. Click "Send" button  
**Expected**: Money is sent successfully and confirmation shown

### TC-008: Send Money to Unregistered User
**Priority**: High  
**Description**: Verify money can be sent to unregistered user  
**Steps**:
1. Login with valid credentials
2. Navigate to "Send Money"
3. Enter unregistered user's email
4. Enter amount
5. Add note (optional)
6. Click "Send" button  
**Expected**: System prompts to invite user and money is sent

### TC-009: Transaction Limits
**Priority**: High  
**Description**: Verify transaction limits are enforced  
**Steps**:
1. Login with valid credentials
2. Navigate to "Send Money"
3. Enter amount exceeding:
   - Daily limit
   - Monthly limit
   - Account balance
4. Click "Send" button  
**Expected**: Appropriate error messages for each limit

## Transaction History

### TC-010: View Transaction History
**Priority**: Medium  
**Description**: Verify transaction history is displayed correctly  
**Steps**:
1. Login with valid credentials
2. Navigate to "Transaction History"
3. Verify following information:
   - Transaction date
   - Amount
   - Recipient/Sender
   - Status
   - Reference number  
**Expected**: All transaction details are displayed correctly

### TC-011: Filter Transactions
**Priority**: Low  
**Description**: Verify transaction filtering works  
**Steps**:
1. Login with valid credentials
2. Navigate to "Transaction History"
3. Apply filters:
   - Date range
   - Transaction type
   - Amount range
   - Status  
**Expected**: Transactions are filtered according to criteria

## Profile Management

### TC-012: Update Profile
**Priority**: Medium  
**Description**: Verify user can update profile information  
**Steps**:
1. Login with valid credentials
2. Navigate to "Profile"
3. Update following information:
   - First Name
   - Last Name
   - Phone Number
   - Profile Picture
4. Click "Save" button  
**Expected**: Profile is updated successfully

### TC-013: Change Password
**Priority**: High  
**Description**: Verify password change functionality  
**Steps**:
1. Login with valid credentials
2. Navigate to "Security Settings"
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click "Change Password" button  
**Expected**: Password is changed successfully

## Security

### TC-014: Session Timeout
**Priority**: High  
**Description**: Verify session timeout functionality  
**Steps**:
1. Login with valid credentials
2. Leave browser idle for 30 minutes
3. Try to perform any action  
**Expected**: User is logged out and redirected to login page

### TC-015: Failed Login Attempts
**Priority**: High  
**Description**: Verify account lockout after failed attempts  
**Steps**:
1. Navigate to login page
2. Enter valid email with wrong password
3. Repeat 5 times  
**Expected**: Account is locked after 5 failed attempts

## Mobile Responsiveness

### TC-016: Mobile View
**Priority**: Medium  
**Description**: Verify application works on mobile devices  
**Steps**:
1. Access application on mobile device
2. Test following features:
   - Registration
   - Login
   - Send Money
   - Transaction History
   - Profile Management  
**Expected**: All features work correctly on mobile view

## Browser Compatibility

### TC-017: Cross-browser Testing
**Priority**: Medium  
**Description**: Verify application works on different browsers  
**Steps**:
1. Access application on different browsers:
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Test critical features:
   - Registration
   - Login
   - Send Money  
**Expected**: Application works consistently across all browsers 