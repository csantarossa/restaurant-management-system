class Reservation {
  constructor(customer, date, time, guests, table) {
    this.customer = customer;
    this.date = date;
    this.time = time;
    this.guests = guests;
    this.table = table;
  }

  confirmReservation() {
    if (this.table) {
      this.table.reserve();
    } else {
      throw new Error("Table is not defined for this reservation.");
    }
  }

  toString() {
    return `Reservation for ${this.customer.name} on ${this.date} at ${this.time} for ${this.guests} guests at Table ${this.table.tableId}`;
  }
}

export default Reservation;
