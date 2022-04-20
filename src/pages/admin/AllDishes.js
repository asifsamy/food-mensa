import { Fragment } from "react";
import { Helmet } from "react-helmet";

import AvailableDishes from "../../components/Dishes/AvailableDishes";

const AllDishes = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Food Mensa - All Dish Items</title>
        <meta name="description" content="All available Dish items" />
      </Helmet>
      <AvailableDishes />
    </Fragment>
  );
};

export default AllDishes;
