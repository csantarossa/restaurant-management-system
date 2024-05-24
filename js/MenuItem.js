class MenuItem {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  toString() {
    return `Item: ${this.name}, Price: $${this.price.toFixed(2)}`;
  }
}

export default MenuItem;
