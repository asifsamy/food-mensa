import { FaStar } from "react-icons/fa";

import useInput from "../../hooks/use-input";
import Button from "../UI/FormFields/Button";
import Input from "../UI/FormFields/Input";

import newItemStyles from "../Dishes/DishItem/NewDishItemForm.module.css";
import { useState } from "react";

const isNotEmpty = (value) => value !== "";

const NewReviewForm = (props) => {
  const stars = Array(5).fill(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const ratingClickHandler = (value) => {
    setRatingValue(value);
  };

  const ratingHoverHandler = (value) => {
    setHoverValue(value);
  };

  const ratingHoverLeaveHandler = () => {
    setHoverValue(undefined);
  };

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: commentValue,
    valueChangeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler,
    reset: resetComment,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (nameIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const today = new Date();
    props.onConfirm({
      name: nameValue,
      comment: commentValue,
      rating: ratingValue,
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
    });
  };

  const resetHandler = () => {
    resetName();
    setRatingValue(0);
    resetComment();
  };

  return (
    <form className={newItemStyles.form} onSubmit={formSubmitHandler}>
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
        <p className={newItemStyles.invalid}>Name can not be empty!</p>
      )}
      <p>
        <strong>Rating</strong>
      </p>
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size="1.5rem"
          style={{
            marginRight: "5px",
            marginTop: "-0.3rem",
            marginBottom: "0.7rem",
            cursor: "pointer",
          }}
          color={(hoverValue || ratingValue) > index ? "orange" : "grey"}
          onClick={() => ratingClickHandler(index + 1)}
          onMouseOver={() => ratingHoverHandler(index + 1)}
          onMouseLeave={ratingHoverLeaveHandler}
        />
      ))}
      <Input
        label="Comment"
        id="comment"
        type="textarea"
        value={commentValue}
        onChange={commentChangeHandler}
        onBlur={commentBlurHandler}
      />
      <div className={newItemStyles.actions}>
        <Button buttonStyle="button--reset" onClick={resetHandler}>
          Reset
        </Button>
        <Button
          buttonStyle="button--submit"
          type="submit"
          disabled={!formIsValid}
        >
          Submit Feedback
        </Button>
      </div>
    </form>
  );
};

export default NewReviewForm;
