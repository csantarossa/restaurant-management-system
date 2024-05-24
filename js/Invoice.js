class Invoice {
  constructor(order) {
    this.order = order;
    this.amountDue = order.totalCost;
    this.isPaid = false;
  }

  processPayment(payment) {
    this.isPaid = true;
    payment.recordTransaction(this.amountDue);
  }

  getInvoiceDetails() {
    const itemDetails = this.order.items
      .map((item) => `${item.name}: $${item.price.toFixed(2)}`)
      .join(", ");
    return `Invoice for Table ${
      this.order.table.tableId
    }. Items: ${itemDetails}. Amount Due: $${this.amountDue.toFixed(
      2
    )}. Paid: ${this.isPaid}`;
  }

  toString() {
    return `Invoice for Table ${
      this.order.table.tableId
    }. Amount Due: $${this.amountDue.toFixed(2)}. Paid: ${this.isPaid}`;
  }
}

export default Invoice;
