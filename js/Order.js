class Order {
  constructor(table, items) {
    this.table = table;
    this.items = items;
    this.status = "Pending";
    this.totalCost = items.reduce((total, item) => total + item.price, 0);
  }

  updateStatus(status) {
    this.status = status;
  }

  getOrderDetails() {
    const itemDetails = this.items
      .map((item) => `${item.name}: $${item.price.toFixed(2)}`)
      .join(", ");
    return `Table: ${this.table.tableId}, Status: ${
      this.status
    }, Items: ${itemDetails}, Total Cost: $${this.totalCost.toFixed(2)}`;
  }

  toString() {
    return `Order for Table ${this.table.tableId}, Status: ${
      this.status
    }, Total Cost: $${this.totalCost.toFixed(2)}`;
  }
}

export default Order;
