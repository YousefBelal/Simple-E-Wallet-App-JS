// Global State
let balance = 0;
let transactions = [];
let currentOperation = null;

let span = document.querySelector("span");
let amountInput = document.querySelector("input");
let recentTransactionsTable = document.querySelector(
  ".recentTransactions tbody"
);
let transactionsLabel = document.querySelector("#transactionsLabel");
let allTransactionsBtn = document.querySelector("#allTransactions");
let depositTransactionsBtn = document.querySelector("#depositTransactions");
let withdrawTransactionsBtn = document.querySelector("#withdrawTransactions");
let recentTransactionsBtn = document.querySelector("#recentTransactionsbtn");

showBalance();
showRecentTransactions();
