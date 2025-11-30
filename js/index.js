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

let showBalance = () => {
  span.innerHTML = `$${balance}`;
};

showBalance();

let deposit = (amount) => {
  let newTransactions = {
    transactionId: transactions.length + 1,
    beforeBalance: balance,
    amount: amount,
    type: "deposit",
    afterBalance: balance + amount,
  };

  transactions.push(newTransactions);
  balance += amount;
  showBalance();
  showRecentTransactions();
  amountInput.value = "";
  closeModal();
};

let withdraw = (amount) => {
  if (balance >= amount) {
    let newTransactions = {
      transactionId: transactions.length + 1,
      beforeBalance: balance,
      amount: amount,
      type: "withdraw",
      afterBalance: balance - amount,
    };
    transactions.push(newTransactions);
    showRecentTransactions();
    balance = balance - amount;
    showBalance();
    amountInput.value = "";
  } else {
    alert("insufficient funds");
  }
  closeModal();
};

let showTransactions = (table, transactions) => {
  table.innerHTML = "";
  transactions.forEach((el, index) => {
    table.innerHTML += `
            <tr>
                <td>${el.transactionId}</td>
                <td>${el.beforeBalance}</td>
                <td>${el.amount}</td>
                <td>${el.type}</td>
                <td>${el.afterBalance}</td>
            </tr>
        `;
  });
};

let openModal = (operation) => {
  currentOperation = operation;
  let modal = document.querySelector(".makeTransaction");
  let label = document.querySelector(".makeTransaction h5");
  modal.style.display = "flex";
  label.innerHTML =
    operation == "Withdraw" ? `Withdrawal Operation` : `Deposit Operation`;
};

let closeModal = () => {
  let modal = document.querySelector(".makeTransaction");
  modal.style.display = "none";
};

let makeTransaction = () => {
  let amountInput = document.querySelector("#transactionAmount");
  let confirmTransaction = confirm("Are you Sure?");
  if (confirmTransaction == true) {
    if (currentOperation == "Deposit") {
      deposit(+amountInput.value);
    } else {
      withdraw(+amountInput.value);
    }
  }
};

let showRecentTransactions = () => {
  allTransactionsBtn.setAttribute("class", "filter-button");
  depositTransactionsBtn.setAttribute("class", "filter-button");
  withdrawTransactionsBtn.setAttribute("class", "filter-button");
  recentTransactionsBtn.setAttribute("class", "filter-button active");

  transactionsLabel.innerText = "Recent Transaction";
  let recentTransactions = [];
  if (transactions.length != 0) {
    recentTransactions.push(transactions[transactions.length - 1]);
  }
  showTransactions(recentTransactionsTable, recentTransactions);
};
showRecentTransactions();

let showAllTransactions = () => {
  allTransactionsBtn.setAttribute("class", "filter-button active");
  depositTransactionsBtn.setAttribute("class", "filter-button");
  withdrawTransactionsBtn.setAttribute("class", "filter-button");
  recentTransactionsBtn.setAttribute("class", "filter-button");

  transactionsLabel.innerText = "All Transactions";
  showTransactions(recentTransactionsTable, transactions);
};

let showDepositTransactions = () => {
  depositTransactionsBtn.setAttribute("class", "filter-button active");
  allTransactionsBtn.setAttribute("class", "filter-button");
  withdrawTransactionsBtn.setAttribute("class", "filter-button");
  recentTransactionsBtn.setAttribute("class", "filter-button");

  transactionsLabel.innerText = "Deposit Transactions";
  let depositTransactions = [];
  transactions.forEach((ele, indx) => {
    if (ele.type == "deposit") {
      depositTransactions.push(ele);
    }
  });
  showTransactions(recentTransactionsTable, depositTransactions);
};

let showWithdrawTransactions = () => {
  depositTransactionsBtn.setAttribute("class", "filter-button");
  allTransactionsBtn.setAttribute("class", "filter-button");
  withdrawTransactionsBtn.setAttribute("class", "filter-button active");
  recentTransactionsBtn.setAttribute("class", "filter-button");

  transactionsLabel.innerText = "Withdraw Transactions";
  let withdrawTransactions = [];
  transactions.forEach((ele, indx) => {
    if (ele.type == "withdraw") {
      withdrawTransactions.push(ele);
    }
  });
  showTransactions(recentTransactionsTable, withdrawTransactions);
};
