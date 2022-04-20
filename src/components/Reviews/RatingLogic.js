import { Fragment } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const getStar = (value) => {
  switch (value) {
    case 0:
      return <FaStar color="grey" />;
    case 50:
      return <FaStarHalfAlt color="orange" />;
    case 100:
      return <FaStar color="orange" />;

    default:
      return;
  }
};

const getStars = (value) => {
  const stars = [];
  const [whole, part] = parseFloat(value).toString().split(".");

  for (let i = 0; i < whole; i++) {
    stars.push(100);
  }
  if (part) {
    stars.push(50);
  }
  for (let i = whole; i < (part ? 4 : 5); i++) {
    stars.push(0);
  }

  return stars;
};

const RatingLogic = ({ ratingValue }) => {
  return (
    <Fragment>
      {getStars(ratingValue).map((value, index) => (
        <span key={index}>{getStar(value)}</span>
      ))}
    </Fragment>
  );
};

export default RatingLogic;
