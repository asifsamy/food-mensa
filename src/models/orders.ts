import Item from "./items";
import User from "./users";

class Order {
  id: string;
  dishItems: Item[];
  status: string;
  user: User;

  constructor(id: string, dishItems: Item[], status: string, user: User) {
    this.id = id;
    this.dishItems = dishItems;
    this.status = status;
    this.user = user;
  }
}

export default Order;
