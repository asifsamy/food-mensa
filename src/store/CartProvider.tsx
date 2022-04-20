import React, { useReducer } from "react";
import Item from "../models/items";
import CartContext, { CartCtxObj } from "./cart-context";

type CartState = {
  items: Item[];
  totalAmount: number;
  cartIsVisible: boolean;
};

type CartAddAction = {
  type: "ADD";
  item: Item;
};

type RemoveCartAction = {
  type: "REMOVE";
  id: string;
};

type OmitCartAction = {
  type: "CLEAR" | "VISIBILITY";
};

type CartAction = CartAddAction | RemoveCartAction | OmitCartAction;

const defaultCartState = {
  items: [],
  totalAmount: 0,
  cartIsVisible: false,
};

const cartReducer = (state: CartState, action: CartAction) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      cartIsVisible: state.cartIsVisible,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      cartIsVisible: state.cartIsVisible,
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
      cartIsVisible: state.cartIsVisible,
    };
  }

  if (action.type === "VISIBILITY") {
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      cartIsVisible: !state.cartIsVisible,
    };
  }

  return defaultCartState;
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartVisibleHandler = () => {
    dispatchCartAction({ type: "VISIBILITY" });
  };

  const cartContext: CartCtxObj = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    cartIsVisible: cartState.cartIsVisible,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    cartVisibility: cartVisibleHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
