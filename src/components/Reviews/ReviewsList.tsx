import { FaUserCircle, FaStar } from "react-icons/fa";
import Review from "../../models/reviews";

import classes from "./Reviews.module.css";

const transformDate = (date: string) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString("en-US", { month: "long" });
  const day = newDate.toLocaleString("en-US", { day: "2-digit" });
  const year = newDate.getFullYear();

  return {
    month,
    day,
    year,
  };
};

const ReviewItem: React.FC<{ review: Review }> = (props) => {
  const stars = Array(5).fill(0);

  const reviewDate = transformDate(props.review.date);

  return (
    <li>
      <div className={classes.user}>
        <FaUserCircle size="1.7rem" color="grey" />
        <h5>{props.review.name}</h5>
      </div>
      {stars.map((_, index) => (
        <FaStar
          key={index}
          color={props.review.rating > index ? "orange" : "grey"}
        />
      ))}
      <div className={classes.date}>
        Reviewd on {reviewDate.day} {reviewDate.month} {reviewDate.year}
      </div>
      <p>{props.review.comment}</p>
    </li>
  );
};

const ReviewsList: React.FC<{ reviews: Review[] }> = (props) => {
  const reviewItem = props.reviews.map((review) => (
    <ReviewItem key={review.id} review={review} />
  ));

  return <>{reviewItem}</>;
};

export default ReviewsList;
