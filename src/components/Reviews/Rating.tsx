import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Review from "../../models/reviews";
import RatingLogic from "./RatingLogic";

const Rating: React.FC<{ dishItemId: string }> = (props) => {
  const id = props.dishItemId;
  const [ratingValue, setRatingValue] = useState(0);

  const { sendRequest: fecthAllRatings } = useHttp();

  const transformRatings = (value: number) => {
    let fractionValue = Math.abs(value) - Math.floor(value);
    if (fractionValue >= 0 && fractionValue < 0.26) {
      value = Math.floor(value);
    } else if (fractionValue > 0.75 && fractionValue < 1) {
      value = Math.ceil(value);
    } else {
      value = Math.floor(value) + 0.5;
    }

    // console.log(typeof value);
    return value;
  };

  useEffect(() => {
    const getRatings = (ratingObjects: Review[]) => {
      const loadedRatings = [];

      let value = 0;
      for (const key in ratingObjects) {
        loadedRatings.push(ratingObjects[key].rating);
        value += ratingObjects[key].rating;
      }
      // console.log(typeof value);

      if (loadedRatings.length > 0) {
        // console.log(typeof loadedRatings.length);
        const transformedValue = transformRatings(value / loadedRatings.length);

        setRatingValue(transformedValue);
      }
    };

    fecthAllRatings(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/reviews/${id}.json`,
      },
      getRatings
    );
  }, [id, fecthAllRatings]);

  //   console.log("Rating: ", ratingValue);

  return <RatingLogic ratingValue={ratingValue} />;
};

export default Rating;
