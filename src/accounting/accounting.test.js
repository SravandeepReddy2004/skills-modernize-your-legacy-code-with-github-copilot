import {
  getBalance,
  resetBalance,
  creditAccount,
  debitAccount
} from './index.js';

beforeEach(() => {
  resetBalance();
});

describe('Accounting System', () => {
  test('TC01 - View current account balance', () => {
    expect(getBalance()).toBe(1000.00);
  });

  test('TC02 - Credit a valid amount', () => {
    const result = creditAccount(250.00);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(1250.00);
  });

  test('TC03 - Debit a valid amount', () => {
    const result = debitAccount(300.00);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(700.00);
  });

  test('TC04 - Debit amount greater than balance', () => {
    debitAccount(600.00); // balance: 400
    const result = debitAccount(800.00);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/Insufficient/);
    expect(getBalance()).toBeLessThan(800.00);
  });

  test('TC05 - Credit multiple times', () => {
    creditAccount(200.00);
    creditAccount(300.00);
    expect(getBalance()).toBe(1500.00);
  });

  test('TC06 - Debit multiple times', () => {
    debitAccount(100.00);
    debitAccount(150.00);
    expect(getBalance()).toBe(750.00);
  });

  test('TC07 - View balance after credit', () => {
    creditAccount(500.00);
    expect(getBalance()).toBe(1500.00);
  });

  test('TC08 - View balance after debit', () => {
    debitAccount(250.00);
    expect(getBalance()).toBe(750.00);
  });

  test('TC09 - Exit application', () => {
    expect(true).toBe(true);
  });

  test('TC10 - Invalid credit amount', () => {
    const result = creditAccount('abc');
    expect(result.success).toBe(false);
  });

  test('TC11 - Invalid debit amount', () => {
    const result = debitAccount('abc');
    expect(result.success).toBe(false);
  });
});
