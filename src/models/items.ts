class Item {
  id: string;
  amount: number;
  name: string;
  price: number;

  constructor(id: string, amount: number, name: string, price: number) {
    this.id = id;
    this.amount = amount;
    this.name = name;
    this.price = price;
  }
}

export default Item;
