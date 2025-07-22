# COBOL Student Account Management System

This COBOL-based system provides a simple CLI interface to manage student accounts, specifically allowing balance inquiries, crediting, and debiting operations. It consists of three core COBOL programs: `MainProgram`, `Operations`, and `DataProgram`.

---

## 📄 File Overview

### 1. `main.cob` — **Main Interface Program**
- **Program-ID:** `MainProgram`
- **Purpose:** Acts as the main control loop and user interface for the account system.
- **Functionality:**
  - Presents a menu with 4 options:
    - View Balance
    - Credit Account
    - Debit Account
    - Exit
  - Accepts user input and delegates operations via `CALL` statements to the `Operations` module.
  - Manages the continuation flag to allow repeated actions until exit.

---

### 2. `operations.cob` — **Operation Handler**
- **Program-ID:** `Operations`
- **Purpose:** Performs the requested operation (view, credit, or debit) based on the argument passed from `MainProgram`.
- **Functionality:**
  - Accepts an operation type (`TOTAL `, `CREDIT`, `DEBIT `).
  - Interacts with the `DataProgram` to read or update the current balance.
  - Prompts user for input when crediting or debiting.
- **Business Logic:**
  - **View Balance:** Calls `DataProgram` with `'READ'` to fetch and display balance.
  - **Credit:** Reads balance, adds user-input amount, and writes back the updated balance.
  - **Debit:**
    - Ensures sufficient funds before debiting.
    - Displays an error if funds are insufficient.

---

### 3. `data.cob` — **Balance Storage Program**
- **Program-ID:** `DataProgram`
- **Purpose:** Acts as a shared memory layer for reading/writing the current account balance.
- **Functionality:**
  - Maintains a `WORKING-STORAGE` value for `STORAGE-BALANCE`.
  - Accepts a mode (`READ` or `WRITE`) and responds accordingly:
    - `READ`: Transfers current balance to the passed variable.
    - `WRITE`: Updates the stored balance with the passed value.

---

## 💼 Business Rules

- **Initial Balance:** The account starts with a balance of `1000.00`.
- **Credit Transactions:**
  - Adds any valid amount entered by the user.
- **Debit Transactions:**
  - Valid only if the current balance is **greater than or equal to** the debit amount.
  - If insufficient funds, the system rejects the transaction and displays a warning.
- **No persistent storage:** All data resides in memory during the execution session only.

---

## 📝 Usage Notes

- The system is designed to run in a COBOL-compatible environment.
- No external database or file I/O is currently used.
- Values like balance will reset upon each execution unless persistent storage is added.

---

## 📌 Suggested Improvements (Future Work)
- Add file I/O to persist account data across sessions.
- Add input validation for non-numeric entries.
- Modularize operation handling to simplify testing and scaling.

---

## 📊 System Diagrams (Mermaid)

To preview the diagrams, make sure your Markdown viewer supports Mermaid (e.g., VS Code with a Mermaid plugin, GitHub rendering, or using a compatible Markdown renderer).

### 1. Data Flow Diagram (DFD)


flowchart TD
    User[User Interface (MainProgram)]
    Ops[Operations Module]
    Data[Data Module (DataProgram)]
    Balance[Account Balance (In-Memory)]

    User -->|Calls with Operation Type| Ops
    Ops -->|Read/Write Balance| Data
    Data -->|Fetches or Stores Value| Balance
    Balance --> Data
    Data --> Ops
    Ops -->|Result (Updated or Fetched Balance)| User

### 2. Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant MainProgram
    participant Operations
    participant DataProgram
    participant BalanceMemory as "STORAGE-BALANCE"

    User->>MainProgram: Select option (e.g., Credit)
    MainProgram->>Operations: CALL with operation type
    Operations->>DataProgram: CALL 'READ', FINAL-BALANCE
    DataProgram->>BalanceMemory: Access STORAGE-BALANCE
    BalanceMemory-->>DataProgram: Return balance
    DataProgram-->>Operations: Return balance

    alt Credit
        Operations->>User: Prompt for credit amount
        User->>Operations: Enter amount
        Operations->>DataProgram: CALL 'WRITE', new balance
        DataProgram->>BalanceMemory: Update STORAGE-BALANCE
    else Debit
        Operations->>User: Prompt for debit amount
        User->>Operations: Enter amount
        Operations->>DataProgram: CALL 'WRITE' if balance sufficient
        DataProgram->>BalanceMemory: Update STORAGE-BALANCE
    end

    Operations->>User: Display result
