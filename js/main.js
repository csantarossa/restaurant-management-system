import Customer from "./Customer.js";
import Invoice from "./Invoice.js";
import Kitchen from "./Kitchen.js";
import MenuItem from "./MenuItem.js";
import Order from "./Order.js";
import Payment from "./Payment.js";
import Reservation from "./Reservation.js";
import Table from "./Table.js";

const menuItems = [
  new MenuItem("Pizza", "Cheese Pizza", 10.0),
  new MenuItem("Burger", "Beef Burger", 8.0),
  new MenuItem("Salad", "Caesar Salad", 7.0),
  new MenuItem("Pasta", "Spaghetti Bolognese", 12.0),
  new MenuItem("Steak", "Grilled Steak", 20.0),
  new MenuItem("Sushi", "Assorted Sushi", 15.0),
  new MenuItem("Tacos", "Beef Tacos", 9.0),
  new MenuItem("Soup", "Chicken Soup", 6.0),
  new MenuItem("Sandwich", "Turkey Sandwich", 8.0),
  new MenuItem("Dessert", "Chocolate Cake", 5.0),
];

const tables = Array.from({ length: 10 }, (_, i) => new Table(i + 1, 4));
const kitchen = new Kitchen();
const payments = new Payment();

function populateItemDropdown() {
  const itemDropdown = document.getElementById("item-name");
  menuItems.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.text = `${item.name} - $${item.price.toFixed(2)}`;
    itemDropdown.appendChild(option);
  });
}

function makeReservation() {
  const name = document.getElementById("customer-name").value;
  const contact = document.getElementById("customer-contact").value;
  const date = document.getElementById("reservation-date").value;
  const time = document.getElementById("reservation-time").value;
  const guests = parseInt(document.getElementById("number-of-guests").value);
  const tableId = parseInt(document.getElementById("table-number").value) - 1;

  if (tableId >= 0 && tableId < tables.length) {
    const table = tables[tableId];

    const customer = new Customer(name, contact);
    const reservation = new Reservation(customer, date, time, guests, table);
    customer.makeReservation(reservation);
    table.addReservation(reservation);

    reservation.confirmReservation();

    const reservationsDiv = document.getElementById("reservations");
    reservationsDiv.innerHTML += `<p>${reservation.toString()}</p>`;
  } else {
    alert("Invalid table number.");
  }
}

function placeOrder() {
  const tableNumber =
    parseInt(document.getElementById("order-table-number").value) - 1;

  if (tableNumber >= 0 && tableNumber < tables.length) {
    const table = tables[tableNumber];
    const customer = table.getCustomer();

    if (customer) {
      const itemName = document.getElementById("item-name").value;
      const item = menuItems.find((i) => i.name === itemName);

      const order = new Order(table, [item]);
      customer.placeOrder(order);
      table.addOrder(order);
      kitchen.receiveOrder(order);

      updateKitchenOrdersTable();
    } else {
      alert("No customer found for this table.");
    }
  } else {
    alert("Invalid table number.");
  }
}

function updateKitchenOrdersTable() {
  const kitchenOrdersTableBody = document.getElementById("kitchen-orders");
  kitchenOrdersTableBody.innerHTML = "";

  kitchen.orders.forEach((order, index) => {
    const row = document.createElement("tr");
    row.setAttribute("id", `order-row-${index}`);
    row.innerHTML = `
      <td>${order.table.tableId}</td>
      <td>${order.getOrderDetails()}</td>
      <td>${order.status}</td>
      <td><button onclick="completeOrder(${index})">Complete</button></td>
    `;
    kitchenOrdersTableBody.appendChild(row);
  });
}

function completeOrder(orderIndex) {
  const order = kitchen.orders[orderIndex];
  kitchen.completeOrder(order);
  document.getElementById(`order-row-${orderIndex}`).remove();
}

function viewKitchenOrders() {
  updateKitchenOrdersTable();
}

function generateInvoice() {
  const tableNumber =
    parseInt(document.getElementById("invoice-table-number").value) - 1;

  if (tableNumber >= 0 && tableNumber < tables.length) {
    const table = tables[tableNumber];
    const customer = table.getCustomer();

    if (table.orders.length > 0) {
      const allItems = table.orders.flatMap((order) => order.items);
      const totalAmountDue = allItems.reduce(
        (total, item) => total + item.price,
        0
      );

      const invoiceTableBody = document.getElementById("invoice");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${table.tableId}</td>
        <td>${allItems.map((item) => item.name).join(", ")}</td>
        <td>$${totalAmountDue.toFixed(2)}</td>
        <td>No</td>
      `;
      invoiceTableBody.appendChild(row);
    } else {
      alert("No orders found for this table.");
    }
  } else {
    alert("Invalid table number.");
  }
}

function processPayment() {
  const tableNumber =
    parseInt(document.getElementById("payment-table-number").value) - 1;

  if (tableNumber >= 0 && tableNumber < tables.length) {
    const table = tables[tableNumber];

    if (table.orders.length > 0) {
      const allItems = table.orders.flatMap((order) => order.items);
      const totalAmountDue = allItems.reduce(
        (total, item) => total + item.price,
        0
      );

      const invoice = new Invoice(table.orders[table.orders.length - 1]);
      invoice.amountDue = totalAmountDue; // Ensure the invoice has the correct total amount
      invoice.processPayment(payments);

      const paymentsTableBody = document.getElementById("payments");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${table.tableId}</td>
        <td>$${totalAmountDue.toFixed(2)}</td>
        <td>Paid</td>
      `;
      paymentsTableBody.appendChild(row);
    } else {
      alert("No orders found for this table.");
    }
  } else {
    alert("Invalid table number.");
  }
}

// Expose functions to the global scope
window.makeReservation = makeReservation;
window.placeOrder = placeOrder;
window.viewKitchenOrders = viewKitchenOrders;
window.generateInvoice = generateInvoice;
window.processPayment = processPayment;
window.completeOrder = completeOrder; // Exposing completeOrder function to the global scope

// Populate the item dropdown when the page loads
document.addEventListener("DOMContentLoaded", populateItemDropdown);
