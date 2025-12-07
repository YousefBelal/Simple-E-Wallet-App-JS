let showBalance = () => {
  span.innerHTML = `$${balance}`;
};

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
  allTransactionsBtn.classList.remove("active");
  depositTransactionsBtn.classList.remove("active");
  withdrawTransactionsBtn.classList.remove("active");
  recentTransactionsBtn.classList.add("active");
  transactionsLabel.innerText = "Recent Transaction";
  let recentTransactions = [];
  if (transactions.length != 0) {
    recentTransactions.push(transactions[transactions.length - 1]);
  }
  showTransactions(recentTransactionsTable, recentTransactions);
};

let showAllTransactions = () => {
  allTransactionsBtn.classList.add("active");
  depositTransactionsBtn.classList.remove("active");
  withdrawTransactionsBtn.classList.remove("active");
  recentTransactionsBtn.classList.remove("active");

  transactionsLabel.innerText = "All Transactions";
  showTransactions(recentTransactionsTable, transactions);
};

let showDepositTransactions = () => {
  allTransactionsBtn.classList.remove("active");
  depositTransactionsBtn.classList.add("active");
  withdrawTransactionsBtn.classList.remove("active");
  recentTransactionsBtn.classList.remove("active");

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
  allTransactionsBtn.classList.remove("active");
  depositTransactionsBtn.classList.remove("active");
  withdrawTransactionsBtn.classList.add("active");
  recentTransactionsBtn.classList.remove("active");

  transactionsLabel.innerText = "Withdraw Transactions";
  let withdrawTransactions = [];
  transactions.forEach((ele, indx) => {
    if (ele.type == "withdraw") {
      withdrawTransactions.push(ele);
    }
  });
  showTransactions(recentTransactionsTable, withdrawTransactions);
};
