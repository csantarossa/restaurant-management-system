class Customer {
  constructor(name, contact) {
    this.name = name;
    this.contact = contact;
    this.reservations = [];
    this.orders = [];
  }

  makeReservation(reservation) {
    this.reservations.push(reservation);
  }

  placeOrder(order) {
    this.orders.push(order);
  }

  toString() {
    return `Customer: ${this.name}, Contact: ${this.contact}`;
  }
}

export default Customer;
