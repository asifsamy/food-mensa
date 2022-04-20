import { Fragment, useState } from "react";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/FormFields/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

import classes from "./DishItemActions.module.css";
import DeleteDishItem from "./DeleteDishItem";
import NewDishItemForm from "./NewDishItemForm";
import Dishes from "../../../models/dishes";

const DishItemActions: React.FC<{
  onUpdateItem: (dishes: Dishes) => void;
  item: Dishes;
  onDelete: () => void;
}> = (props) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);
  const [callDeleteComponent, setCallDeleteComponent] = useState(false);

  const {
    isLoading: isUpdating,
    error: updateError,
    sendRequest: updateDishItemRequest,
  } = useHttp();

  const showUpdateModal = () => {
    setIsModalOn(true);
  };

  const hideModalHandler = () => {
    setIsModalOn(false);
    setDidUpdate(false);
  };

  const updateDishItemResponse = (updatedDishItem: Dishes) => {
    setDidUpdate(true);
    // pass the updated value for updating local state
    props.onUpdateItem({
      id: props.item.id,
      name: updatedDishItem.name,
      description: updatedDishItem.description,
      price: updatedDishItem.price,
    });
  };

  const updateDishItemHandler = async (updatedDishItem: Dishes) => {
    updateDishItemRequest(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes/${props.item.id}.json`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: {
          name: updatedDishItem.name,
          description: updatedDishItem.description,
          price: +updatedDishItem.price,
        },
      },
      updateDishItemResponse.bind(null, updatedDishItem) // bind() => for pre-configuration
    );
  };

  // To show the update form in the modal. re-use the NewDishItemForm Component
  const updateFormModal = (
    <Fragment>
      <NewDishItemForm item={props.item} onConfirm={updateDishItemHandler} />
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Cancel
        </Button>
      </div>
    </Fragment>
  );

  // immidiately after sending the request
  const isUpdatingModal = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  // When the request is sent successfully
  const didUpdateModal = (
    <Fragment>
      <p>
        The Dish item is updated successfully! Reload the page to see changes!
      </p>
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  const errorUpdatingModal = (
    <div className={classes.actions}>
      <p className={classes.invalid}>{updateError}</p>
    </div>
  );

  const deleteDishItem = () => {
    setCallDeleteComponent(true);
  };
  //   console.log("callDeleteC. - deleteDishItem: ", callDeleteComponent);

  // render the delete component with state
  const deleteComponent = (
    <DeleteDishItem
      id={props.item.id}
      callDeleteState={setCallDeleteComponent}
      // one state up to its' parent component
      deleteById={props.onDelete}
    />
  );

  return (
    <Fragment>
      <Button buttonStyle="button--edit" onClick={showUpdateModal}>
        Update
      </Button>
      <Button buttonStyle="button--delete" onClick={deleteDishItem}>
        Delete
      </Button>
      {isModalOn && (
        <Modal onClose={hideModalHandler}>
          {!isUpdating && !didUpdate && updateFormModal}
          {isUpdating && isUpdatingModal}
          {!isUpdating && didUpdate && didUpdateModal}
          {updateError && errorUpdatingModal}
        </Modal>
      )}
      {callDeleteComponent && deleteComponent}
    </Fragment>
  );
};

export default DishItemActions;
