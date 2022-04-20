import React, { Fragment, useState } from "react";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/FormFields/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";
import classes from "./DishItemActions.module.css";

const DeleteDishItem: React.FC<{
  id: string;
  deleteById: (id: string) => void;
  callDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [isModalOn, setIsModalOn] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  // Destructuring from useHttp custom hook for processing post request (send data)
  const {
    isLoading: isDeleting,
    error: deleteError,
    sendRequest: deleteDishItemRequest,
  } = useHttp();

  const hideModalHandler = () => {
    setIsModalOn(false);
    setIsDeleted(false);
    props.callDeleteState(false);
  };
  //   console.log("isModalOn from DeleteDishItem: ", isModalOn);

  const deleteDishItemResponse = () => {
    setIsDeleted(true);
    // state up to its' parent components -- up to AvailableDishes component
    props.deleteById(props.id);
  };

  const deleteDishItemHandler = () => {
    deleteDishItemRequest(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes/${props.id}.json`,
        method: "DELETE",
      },
      deleteDishItemResponse
    );
  };

  // Delete confirmation - not yet deleted
  const confirmDeleteModal = (
    <Fragment>
      <p>Are you sure! You want to delete this dish item!</p>
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Cancel
        </Button>
        <Button buttonStyle="button--delete" onClick={deleteDishItemHandler}>
          Confirm
        </Button>
      </div>
    </Fragment>
  );

  // immidiately after sending the request
  const showLoadingSpinner = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  // deleted successfully - show a success message
  const deleteSucceedModal = (
    <Fragment>
      <p>
        The Dish item has been deleted successfully!Reload the page to see the
        changes!
      </p>
      <div className={classes.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  const deleteErrorModal = (
    <div className={classes.actions}>
      <p className={classes.invalid}>{deleteError}</p>
    </div>
  );

  return (
    <div>
      {isModalOn && (
        <Modal onClose={hideModalHandler}>
          {!isDeleted && !isDeleting && !deleteError && confirmDeleteModal}
          {isDeleting && showLoadingSpinner}
          {isDeleted && !isDeleting && deleteSucceedModal}
          {deleteError && deleteErrorModal}
        </Modal>
      )}
    </div>
  );
};

export default DeleteDishItem;
