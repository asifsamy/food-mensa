import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import User from "../../models/users";
import CartContext from "../../store/cart-context";
import Button from "../UI/FormFields/Button";
import Input from "../UI/FormFields/Input";
import classes from "./Checkout.module.css";

// some validation rules
const isNotEmpty = (value: string) => value.trim() !== "";
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout: React.FC<{ onConfirm: (user: User) => void }> = (props) => {
  const cartCtx = useContext(CartContext);
  // our custom useInput hook for name input
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  // our custom useInput hook for street input
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);

  // our custom useInput hook for city input
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  // our custom useInput hook for post code input
  const {
    value: postCodeValue,
    isValid: postCodeIsValid,
    hasError: postCodeHasError,
    valueChangeHandler: postCodeChangeHandler,
    inputBlurHandler: postCodeBlurHandler,
  } = useInput(isFiveChars);

  // Check if all the inputs are valid
  let formIsValid = false;
  if (nameIsValid && streetIsValid && cityIsValid && postCodeIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postCodeValue,
    });
  };

  const cartCancelHandler = () => {
    cartCtx.cartVisibility();
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        id="name"
        type="text"
        label="Enter Name"
        value={nameValue}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        errorStyling={nameHasError}
      />
      {nameHasError && (
        <p className={classes.invalid}>Please enter a valid name!</p>
      )}
      <Input
        id="street"
        type="text"
        label="Street and House Number"
        value={streetValue}
        onChange={streetChangeHandler}
        onBlur={streetBlurHandler}
        errorStyling={streetHasError}
      />
      {streetHasError && (
        <p className={classes.invalid}>
          Please enter a street and house number!
        </p>
      )}
      <Input
        type="text"
        id="postal"
        label="Postal Code"
        value={postCodeValue}
        onChange={postCodeChangeHandler}
        onBlur={postCodeBlurHandler}
        errorStyling={postCodeHasError}
      />
      {postCodeHasError && (
        <p className={classes.invalid}>Please enter a 5 digit postal code!</p>
      )}
      <Input
        type="text"
        id="city"
        label="City"
        value={cityValue}
        onChange={cityChangeHandler}
        onBlur={cityBlurHandler}
        errorStyling={cityHasError}
      />
      {cityHasError && (
        <p className={classes.invalid}>Please enter a valid city!</p>
      )}
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={cartCancelHandler}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formIsValid}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
