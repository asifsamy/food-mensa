import React from "react";
import Item from "../models/items";

export type CartCtxObj = {
  items: Item[];
  totalAmount: number;
  cartIsVisible: boolean;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartVisibility: () => void;
};

const CartContext = React.createContext<CartCtxObj>({
  items: [],
  totalAmount: 0,
  cartIsVisible: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  cartVisibility: () => {},
});

export default CartContext;
