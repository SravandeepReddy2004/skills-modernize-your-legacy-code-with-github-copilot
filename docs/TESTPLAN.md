# 📋 COBOL Student Account Management System - Test Plan

This document outlines the test plan for validating the business logic of the current COBOL-based student account management system. The tests are structured to be reusable for both stakeholder validation and future automated testing (e.g., in a Node.js app).

---

## ✅ Test Cases

| Test Case ID | Test Case Description            | Pre-conditions                            | Test Steps                                                                                                                                 | Expected Result                                                  | Actual Result | Status (Pass/Fail) | Comments                       |
|--------------|----------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|----------------|---------------------|-------------------------------|
| TC01         | View current account balance     | STORAGE-BALANCE initialized to 1000.00     | 1. Launch app<br>2. Select option 1: "View Balance"                                                                                         | Balance displayed as `1000.00`                                  |                |                     |                               |
| TC02         | Credit a valid amount            | STORAGE-BALANCE initialized to 1000.00     | 1. Launch app<br>2. Select option 2: "Credit Account"<br>3. Enter `250.00`                                                                  | "Amount credited. New balance: 1250.00" displayed                |                |                     |                               |
| TC03         | Debit a valid amount             | STORAGE-BALANCE initialized to 1000.00     | 1. Launch app<br>2. Select option 3: "Debit Account"<br>3. Enter `300.00`                                                                   | "Amount debited. New balance: 700.00" displayed                  |                |                     |                               |
| TC04         | Debit amount greater than balance| STORAGE-BALANCE initialized to 500.00      | 1. Launch app<br>2. Select option 3: "Debit Account"<br>3. Enter `800.00`                                                                   | "Insufficient funds for this debit." message shown               |                |                     | Ensure balance remains 500.00 |
| TC05         | Credit multiple times            | STORAGE-BALANCE initialized to 1000.00     | 1. Credit `200.00`<br>2. Credit `300.00`                                                                                                    | New balance should be `1500.00`                                  |                |                     |                               |
| TC06         | Debit multiple times             | STORAGE-BALANCE initialized to 1000.00     | 1. Debit `100.00`<br>2. Debit `150.00`                                                                                                      | New balance should be `750.00`                                   |                |                     |                               |
| TC07         | View balance after credit        | STORAGE-BALANCE initialized to 1000.00     | 1. Credit `500.00`<br>2. View Balance                                                                                                       | Balance should display `1500.00`                                 |                |                     |                               |
| TC08         | View balance after debit         | STORAGE-BALANCE initialized to 1000.00     | 1. Debit `250.00`<br>2. View Balance                                                                                                        | Balance should display `750.00`                                  |                |                     |                               |
| TC09         | Exit the application             | Application is running                     | 1. Select option 4: "Exit"                                                                                                                  | Application should exit gracefully and display "Goodbye!"        |                |                     |                               |
| TC10         | Invalid menu input               | Application is running                     | 1. Enter an invalid option (e.g., `9` or `abc`)                                                                                             | "Invalid choice, please select 1-4." message displayed           |                |                     |                               |

---

## 📝 Notes

- This test plan is based on business rules and behavior in the existing COBOL implementation.
- Balances are in-memory only; they reset on each run.
- All test cases assume interactive CLI input/output.
- The `Actual Result`, `Status`, and `Comments` columns should be completed during manual or automated test execution.

---

## 🚀 Next Steps

- Use this plan as a base to implement **unit tests** and **integration tests** in the upcoming Node.js version.
- Align test case IDs with your test runner (e.g., Jest, Mocha).
- Consider parameterizing input/output logic for future automation.

