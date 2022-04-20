import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import Review from "../../models/reviews";
import LoadingSpinner from "../UI/LoadingSpinner";
import NewReview, { DishIdParams } from "./NewReview";
import classes from "./Reviews.module.css";
import ReviewsList from "./ReviewsList";

const Reviews = () => {
  const [availableReviews, setAvailableReviews] = useState<Review[]>([]);
  const [addNewReviewModal, setAddnewReviewModal] = useState(false);

  const params = useParams<DishIdParams>();
  const { dishId } = params;

  const { isLoading, error, sendRequest: fetchAllReviews } = useHttp();

  useEffect(() => {
    const transformReviews = (reviewsObj: Review[]) => {
      const loadedReviews = [];

      for (const key in reviewsObj) {
        loadedReviews.push({
          id: key,
          name: reviewsObj[key].name,
          rating: reviewsObj[key].rating,
          date: reviewsObj[key].date,
          comment: reviewsObj[key].comment,
        });
      }

      setAvailableReviews(loadedReviews);
    };

    fetchAllReviews(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/reviews/${dishId}.json`,
      },
      transformReviews
    );
  }, [fetchAllReviews, dishId]);

  //   console.log("length:", availableReviews.length);

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  let reviewsContent;
  if (availableReviews.length === 0) {
    reviewsContent = <p className="centered">No reviews were given!</p>;
  }

  if (availableReviews.length > 0) {
    reviewsContent = <ReviewsList reviews={availableReviews} />;
  }

  const newReviewModalHandler = () => {
    setAddnewReviewModal(true);
  };

  const newRevewAddedHandler = (addedNewReview: Review) => {
    setAvailableReviews((prevState) => prevState.concat(addedNewReview));
  };

  return (
    <Fragment>
      {addNewReviewModal && (
        <NewReview
          reviewModalState={setAddnewReviewModal}
          onAddNewReview={newRevewAddedHandler}
        />
      )}
      <section className={classes.reviews}>
        <div className="centered">
          <button
            className="uni-button"
            type="button"
            onClick={newReviewModalHandler}
          >
            Give Feedback
          </button>
        </div>
        <ul>{reviewsContent}</ul>
      </section>
    </Fragment>
  );
};

export default Reviews;
