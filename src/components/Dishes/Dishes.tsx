import { Fragment } from "react";
import AvailableDishes from "./AvailableDishes";
import DishesSummary from "./DishesSummary";

const Dishes = () => {
  return (
    <Fragment>
      <DishesSummary />
      <AvailableDishes />
    </Fragment>
  );
};

export default Dishes;
