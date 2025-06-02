# Bug Reports

## Bug Report Template
```
Bug ID: [Auto-generated]
Title: [Clear, concise description]
Severity: [Critical/High/Medium/Low]
Priority: [P0/P1/P2/P3]
Environment: [Browser/OS/Device]
Reporter: [Name]
Date Reported: [YYYY-MM-DD]
Status: [New/In Progress/Fixed/Verified/Closed]

### Description
[Detailed description of the issue]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots/Videos
[Attach relevant media]

### Additional Information
- Browser Console Logs: [If applicable]
- Network Logs: [If applicable]
- Related Issues: [If any]
```

## Example Bug Reports

### Bug ID: PAY-001
**Title**: Registration form allows submission with invalid phone number format  
**Severity**: High  
**Priority**: P1  
**Environment**: Chrome 122.0.6261.69, Windows 11  
**Reporter**: George Kplivi  
**Date Reported**: 2025-06-01  
**Status**: New  

#### Description
The registration form accepts phone numbers in invalid formats, which could lead to data inconsistency and potential issues with SMS verification.

#### Steps to Reproduce
1. Navigate to registration page
2. Fill in valid details for all fields
3. Enter phone number in format: "123456" (without country code)
4. Click "Register" button

#### Expected Behavior
Form should validate phone number format and show error message for invalid format.

#### Actual Behavior
Form accepts the invalid phone number and proceeds with registration.

#### Screenshots/Videos
![Invalid Phone Number](screenshots/pay-001-invalid-phone.png)

#### Additional Information
- Browser Console Logs: No errors
- Network Logs: POST request to /api/register returns 200
- Related Issues: None

---

### Bug ID: PAY-002
**Title**: Transaction history pagination breaks when filtering with date range  
**Severity**: Medium  
**Priority**: P2  
**Environment**: Firefox 123.0, macOS Sonoma  
**Reporter**: George Kplivi  
**Date Reported**: 2025-06-01  
**Status**: In Progress  

#### Description
When applying date range filter in transaction history, the pagination controls become unresponsive and show incorrect total pages.

#### Steps to Reproduce
1. Login to account
2. Navigate to Transaction History
3. Apply date range filter (e.g., Last 30 days)
4. Try to navigate to next page
5. Observe pagination behavior

#### Expected Behavior
Pagination should work correctly with filtered results, showing correct total pages and allowing navigation.

#### Actual Behavior
- Pagination controls become unresponsive
- Total pages count shows incorrect number
- Next/Previous buttons don't work

#### Screenshots/Videos
![Pagination Issue](screenshots/pay-002-pagination.png)

#### Additional Information
- Browser Console Logs: 
  ```
  Error: Cannot read property 'totalPages' of undefined
  at TransactionHistory.js:156
  ```
- Network Logs: API returns 500 error when requesting page 2
- Related Issues: PAY-003 (Similar issue with amount filter)

---

### Bug ID: PAY-003
**Title**: Send Money confirmation dialog shows incorrect amount after currency conversion  
**Severity**: Critical  
**Priority**: P0  
**Environment**: Safari 17.3, iOS 17.3.1  
**Reporter**: George Kplivi  
**Date Reported**: 2025-06-01  
**Status**: Fixed  

#### Description
When sending money with currency conversion, the confirmation dialog shows the original amount instead of the converted amount, which could lead to user confusion and potential financial errors.

#### Steps to Reproduce
1. Login to account
2. Navigate to Send Money
3. Select recipient in different currency (e.g., USD to EUR)
4. Enter amount (e.g., 100 USD)
5. Click "Send" button
6. Observe confirmation dialog

#### Expected Behavior
Confirmation dialog should show both original and converted amounts clearly.

#### Actual Behavior
Confirmation dialog shows only original amount without conversion.

#### Screenshots/Videos
![Confirmation Dialog](screenshots/pay-003-confirmation.png)



---

### Bug ID: PAY-004
**Title**: Profile picture upload fails for images larger than 2MB  
**Severity**: Low  
**Priority**: P3  
**Environment**: Chrome 122.0.6261.69, Android 14  
**Reporter**: George Kplivi  
**Date Reported**: 2025-06-01  
**Status**: Verified  

#### Description
The profile picture upload feature doesn't provide clear feedback when users attempt to upload images larger than 2MB, leading to a poor user experience.

#### Steps to Reproduce
1. Login to account
2. Navigate to Profile
3. Click "Change Profile Picture"
4. Select image larger than 2MB
5. Click "Upload"

#### Expected Behavior
System should show clear error message about file size limit and provide guidance on how to proceed.

#### Actual Behavior
Upload button becomes unresponsive with no feedback to user.

#### Screenshots/Videos
![Upload Issue](screenshots/pay-004-upload.png)
