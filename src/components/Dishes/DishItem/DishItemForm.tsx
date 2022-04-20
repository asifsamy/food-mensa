import React, { useRef, useState } from "react";
import Button from "../../UI/FormFields/Button";
import classes from "./DishItemForm.module.css";

const DishItemForm: React.FC<{
  id: string;
  onAddToCart: (amount: number) => void;
}> = (props) => {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount; // convert a string to a number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor={props.id}>Amount</label>
        <input
          id={`amount_${props.id}`}
          ref={amountInputRef}
          type="number"
          min="1"
          max="5"
          step="1"
          defaultValue="1"
        />
      </div>
      <Button type="submit">+ Add</Button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default DishItemForm;
