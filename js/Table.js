class Table {
  constructor(tableId, capacity) {
    this.tableId = tableId;
    this.capacity = capacity;
    this.isReserved = false;
    this.reservation = null;
    this.orders = [];
  }

  reserve() {
    this.isReserved = true;
  }

  release() {
    this.isReserved = false;
    this.reservation = null;
    this.orders = [];
  }

  addReservation(reservation) {
    this.reservation = reservation;
    this.reserve();
  }

  addOrder(order) {
    this.orders.push(order);
  }

  getCustomer() {
    return this.reservation ? this.reservation.customer : null;
  }

  toString() {
    return `Table ${this.tableId} for ${this.capacity} people. Reserved: ${this.isReserved}`;
  }
}

export default Table;
