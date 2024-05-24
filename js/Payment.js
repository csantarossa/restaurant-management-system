class Payment {
  constructor() {
    this.transactions = [];
  }

  recordTransaction(amount) {
    this.transactions.push(amount);
  }

  toString() {
    return `Payment: ${this.transactions.length} transactions`;
  }
}

export default Payment;
