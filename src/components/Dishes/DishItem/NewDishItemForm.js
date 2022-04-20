import useInput from "../../../hooks/use-input";
import Button from "../../UI/FormFields/Button";
import Input from "../../UI/FormFields/Input";
import classes from "./NewDishItemForm.module.css";

// some validation rules
const isNotEmpty = (value) => value !== "";
const isNotNegetive = (value) => value > 0;

const NewDishItemForm = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty, props.item ? props.item.name : "");

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty, props.item ? props.item.description : "");

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNotNegetive, props.item ? props.item.price : "");

  // Check if all the inputs are valid
  let formIsValid = false;
  if (nameIsValid && descriptionIsValid && priceIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      description: descriptionValue,
      price: priceValue,
    });
  };

  const resetHandler = () => {
    resetDescription();
    resetName();
    resetPrice();
  };

  return (
    <div>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <Input
          label="Name"
          id="name"
          type="text"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          errorStyling={nameHasError}
        />
        {nameHasError && (
          <p className={classes.invalid}>Please enter a valid name!</p>
        )}
        <Input
          label="Description"
          id="description"
          type="textarea"
          value={descriptionValue}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          errorStyling={descriptionHasError}
        />
        {descriptionHasError && (
          <p className={classes.invalid}>Please enter a valid name!</p>
        )}
        <Input
          label="Price"
          id="price"
          type="number"
          min="1"
          step="any"
          value={priceValue}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
          errorStyling={priceHasError}
        />
        {priceHasError && (
          <p className={classes.invalid}>Please enter a valid name!</p>
        )}
        <div className={classes.actions}>
          <Button buttonStyle="button--reset" onClick={resetHandler}>
            Reset
          </Button>
          <Button
            buttonStyle="button--edit"
            type="submit"
            disabled={!formIsValid}
          >
            {props.item ? "Update" : "Add New Dish"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewDishItemForm;
