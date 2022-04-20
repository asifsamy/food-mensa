import React, { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
import Item from "../../models/items";
import User from "../../models/users";
import CartContext from "../../store/cart-context";
import Button from "../UI/FormFields/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart: React.FC = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  // Destructuring from useHttp custom hook for processing post request (send data)
  const {
    isLoading: isSubmitting,
    error: submitError,
    sendRequest: sendOrderRequest,
  } = useHttp();

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: Item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const hideCartHandler = () => {
    cartCtx.cartVisibility();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <Button buttonStyle="button--cancel" onClick={hideCartHandler}>
        Close
      </Button>
      {hasItems && <Button onClick={orderHandler}>Order</Button>}
    </div>
  );

  const createOrder = (userData: User) => {
    if (userData.name) {
      // 'name' => is 'id' in firebase
      setDidSubmit(true);
      console.log(userData);
      cartCtx.clearCart();
    }
  };

  // After getting the data form the Checkout (children component) form
  const submitOrderHandler = async (userData: User) => {
    sendOrderRequest(
      {
        url: "https://mensa-app-80da4-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          user: userData,
          dishItems: cartCtx.items,
          status: "pending",
        },
      },
      createOrder.bind(null, userData) // bind() => for pre-configuration
    );
    // setDidSubmit(true);
  };

  // When the users data is not submitted
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  // immidiately after sending the requwst
  const isSubmittingModalContent = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );
  // When the request is successfully sent
  const didSubmitModalContent = (
    <React.Fragment>
      <p>
        Yor order is successful! Your meal will be delivered within 30 minutes
      </p>
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideCartHandler}>
          Close
        </Button>
      </div>
    </React.Fragment>
  );

  const errorSubmittedModalContent = (
    <React.Fragment>
      <div className={classes.actions}>
        <p>{submitError}</p>
        <Button buttonStyle="button--cancel" onClick={hideCartHandler}>
          Close
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={hideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {submitError && errorSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
