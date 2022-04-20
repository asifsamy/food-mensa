import { Fragment } from "react";
import { Helmet } from "react-helmet";

import AvailableOrders from "../../components/Orders/AvailableOrders";

const Orders = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Food Mensa - Manage Orders</title>
        <meta name="description" content="Manage Orders" />
      </Helmet>
      <h2 className="centered">Available Orders</h2>
      <AvailableOrders />
    </Fragment>
  );
};

export default Orders;
