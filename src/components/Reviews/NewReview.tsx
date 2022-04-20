import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import Review from "../../models/reviews";
import newItemStyles from "../Dishes/DishItem/DishItemActions.module.css";
import Button from "../UI/FormFields/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import NewReviewForm from "./NewReviewForm";

export type DishIdParams = {
  dishId: string;
};

const NewReview: React.FC<{
  reviewModalState: (value: boolean) => void;
  onAddNewReview: (reviewObject: Review) => void;
}> = (props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOn, setIsModalOn] = useState(true);
  const params = useParams<DishIdParams>();
  const { dishId } = params;

  const {
    isLoading: isAdding,
    error: addError,
    sendRequest: addNewReviewRequest,
  } = useHttp();

  const hideModalHandler = () => {
    setIsModalOn(false);
    setIsAdded(false);
    props.reviewModalState(false);
  };

  // newReviewData could be a problem
  const addnewReviewResponse = (newReview: Review, newReviewData: Review) => {
    setIsAdded(true);
    const generatedId = newReviewData.name; // firebase-specific => "name" contains generated id

    const createdReview = {
      id: generatedId,
      name: newReview.name,
      comment: newReview.comment,
      rating: newReview.rating,
      date: newReview.date,
    };

    props.onAddNewReview(createdReview);
  };

  const creatNewReviewHandler = async (newReview: Review) => {
    addNewReviewRequest(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/reviews/${dishId}.json`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name: newReview.name,
          description: newReview.comment,
          rating: newReview.rating,
          date: newReview.date,
        },
      },
      addnewReviewResponse.bind(null, newReview)
    );
  };

  // To show the insert form in the modal
  const addReviewModalForm = (
    <Fragment>
      <NewReviewForm onConfirm={creatNewReviewHandler} />
      <div className={newItemStyles.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  // immidiately after sending the request
  const loaderContent = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  // When the request is sent successfully
  const addedItemModal = (
    <Fragment>
      <p>A New Review is added successfully! Reload the page to see changes!</p>
      <div className={newItemStyles.actions}>
        <Button buttonStyle="button--cancel" onClick={hideModalHandler}>
          Close
        </Button>
      </div>
    </Fragment>
  );

  const errorAddingModal = (
    <div className={newItemStyles.actions}>
      <p className={newItemStyles.invalid}>{addError}</p>
    </div>
  );

  return (
    <Fragment>
      {isModalOn && (
        <Modal onClose={hideModalHandler}>
          {!isAdding && !isAdded && addReviewModalForm}
          {isAdding && loaderContent}
          {!isAdding && isAdded && addedItemModal}
          {addError && errorAddingModal}
        </Modal>
      )}
    </Fragment>
  );
};

export default NewReview;
