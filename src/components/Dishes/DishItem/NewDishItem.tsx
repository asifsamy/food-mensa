import { Fragment, useState } from "react";
import useHttp from "../../../hooks/use-http";
import Dishes from "../../../models/dishes";
import Button from "../../UI/FormFields/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";
import classes from "./DishItemActions.module.css";
import NewDishItemForm from "./NewDishItemForm";

const NewDishItem: React.FC<{
  callNewDishState: (value: boolean) => void;
  onAddNewDishItem: (dishes: Dishes) => void;
}> = (props) => {
  const [isModalOn, setIsModalOn] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const {
    isLoading: isAdding,
    error: addError,
    sendRequest: addNewDishItemRequest,
  } = useHttp();

  const hideModalHandler = () => {
    setIsModalOn(false);
    setIsAdded(false);
    props.callNewDishState(false);
  };

  const addNewDishItemResponse = (
    newDishItem: Dishes,
    newDishItemData: Dishes
  ) => {
    setIsAdded(true);
    const generatedId = newDishItemData.name; // firebase-specific => "name" contains generated id
    const createdDishItem = {
      id: generatedId,
      name: newDishItem.name,
      description: newDishItem.description,
      price: newDishItem.price,
    };
    props.onAddNewDishItem(createdDishItem);
    console.log(generatedId);
  };

  const creatNewDishHandler = async (newDishItem: Dishes) => {
    addNewDishItemRequest(
      {
        url: "https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name: newDishItem.name,
          description: newDishItem.description,
          price: newDishItem.price,
        },
      },
      addNewDishItemResponse.bind(null, newDishItem) // bind() => for pre-configuration
    );
  };

  // To show the insert form in the modal
  const addItemModal = (
    <Fragment>
      <NewDishItemForm onConfirm={creatNewDishHandler} />
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  // immidiately after sending the request
  const addingItemModal = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  // When the request is sent successfully
  const addedItemModal = (
    <Fragment>
      <p>
        A New Dish Item is added successfully! Reload the page to see changes!
      </p>
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  const errorAddingModal = (
    <div className={classes.actions}>
      <p className={classes.invalid}>{addError}</p>
    </div>
  );

  return (
    <div>
      {isModalOn && (
        <Modal onClose={hideModalHandler}>
          {!isAdding && !isAdded && addItemModal}
          {isAdding && addingItemModal}
          {!isAdding && isAdded && addedItemModal}
          {addError && errorAddingModal}
        </Modal>
      )}
    </div>
  );
};

export default NewDishItem;
