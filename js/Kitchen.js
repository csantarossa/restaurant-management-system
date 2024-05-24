class Kitchen {
  constructor() {
    this.orders = [];
  }

  receiveOrder(order) {
    this.orders.push(order);
    order.updateStatus("In Preparation");
  }

  completeOrder(order) {
    order.updateStatus("Completed");
  }

  toString() {
    return `Kitchen: ${this.orders.length} orders`;
  }
}

export default Kitchen;
