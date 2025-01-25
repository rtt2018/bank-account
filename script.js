const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
  create(amount, type) {
    if (!((type ?? false) && (amount ?? false))) {
      console.log("Одна з необхідних змінних не визначена!");
      return;
    } else {
      return { id: crypto.randomUUID(), type, amount };
    }
  },
};

const account = {
  balance: 0,
  transactions: [],

  createTransaction(amount, type) {
    return Transaction.create(amount, type);
  },

  deposit(amount) {
    this.transactions.push(this.createTransaction(amount, Transaction.DEPOSIT));
    this.balance += amount;
  },

  withdraw(amount) {
    this.transactions.push(
      this.createTransaction(amount, Transaction.WITHDRAW)
    );
    this.balance -= amount;
  },

  getBalance() {
    return this.balance;
  },

  getTransactionDetails(id) {
    return this.transactions.filter((transaction) => transaction.id === id);
  },

  getTransactionTotal(type) {
    return this.transactions
      .filter((transaction) => transaction.type === type)
      .reduce((sum, transaction) => {
        return (sum += transaction.amount);
      }, 0);
  },
};

account.deposit(1000000);
console.log(account.getBalance());
account.withdraw(50000);
console.log(account.getBalance());
account.withdraw(50000);
account.withdraw(1000);
account.withdraw(30000);
console.log(account.getTransactionDetails(account.transactions[1].id));
console.log(account.getTransactionTotal(Transaction.WITHDRAW));

console.log("account:", account);
