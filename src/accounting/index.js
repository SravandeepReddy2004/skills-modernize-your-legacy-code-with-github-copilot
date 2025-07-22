import readline from 'readline-sync';

let balance = 1000.00;

export function getBalance() {
  return balance;
}

export function resetBalance() {
  balance = 1000.00;
}

export function creditAccount(amount) {
  if (!isNaN(amount) && amount > 0) {
    balance += amount;
    return { success: true, newBalance: balance };
  }
  return { success: false, message: 'Invalid credit amount' };
}

export function debitAccount(amount) {
  if (!isNaN(amount) && amount > 0) {
    if (balance >= amount) {
      balance -= amount;
      return { success: true, newBalance: balance };
    }
    return { success: false, message: 'Insufficient funds' };
  }
  return { success: false, message: 'Invalid debit amount' };
}

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function main() {
  let continueFlag = true;
  while (continueFlag) {
    showMenu();
    const choice = readline.question('Enter your choice (1-4): ').trim();

    switch (choice) {
      case '1':
        console.log(`\nCurrent balance: ${getBalance().toFixed(2)}\n`);
        break;
      case '2': {
        const amount = parseFloat(readline.question('Enter credit amount: '));
        const result = creditAccount(amount);
        if (result.success) {
          console.log(`\nAmount credited. New balance: ${result.newBalance.toFixed(2)}\n`);
        } else {
          console.log(`\n${result.message}\n`);
        }
        break;
      }
      case '3': {
        const amount = parseFloat(readline.question('Enter debit amount: '));
        const result = debitAccount(amount);
        if (result.success) {
          console.log(`\nAmount debited. New balance: ${result.newBalance.toFixed(2)}\n`);
        } else {
          console.log(`\n${result.message}\n`);
        }
        break;
      }
      case '4':
        continueFlag = false;
        console.log('\nExiting the program. Goodbye!\n');
        break;
      default:
        console.log('\nInvalid choice, please select 1-4.\n');
    }
  }
}

if (process.argv[1].endsWith('index.js')) {
  main();
}
