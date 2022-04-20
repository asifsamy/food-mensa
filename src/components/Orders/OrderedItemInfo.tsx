import { useState } from "react";
import useHttp from "../../hooks/use-http";
import Order from "../../models/orders";
import Button from "../UI/FormFields/Button";
import classes from "./OrderedItemInfo.module.css";

const OrderedItemInfo = ({ id, dishItems, status, user }: Order) => {
  // const { id, dishItems, status, user } = props;

  const [itemState, setItemState] = useState({
    dishItems,
    status,
    user,
  });

  const { isLoading, error, sendRequest: updateOrderStatusRequest } = useHttp();

  const updateOrderStatusResponse = (responseData: Order) => {
    // console.log("success! => ", responseData);
    setItemState({
      dishItems,
      status: responseData.status,
      user,
    });
  };

  const changeStatusHandler = async () => {
    updateOrderStatusRequest(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/orders/${id}.json`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: {
          status: "delivered",
        },
      },
      updateOrderStatusResponse.bind(null)
    );
  };

  return (
    <li className={classes.dish}>
      <div>
        {itemState.dishItems.map((dishItem) => (
          <h4 key={dishItem.name}>
            {dishItem.name}: ({dishItem.amount}x)
          </h4>
        ))}
      </div>
      <div>
        <div className={classes.description}>
          <strong>Name:</strong> {itemState.user.name}
        </div>
        <div className={classes.description}>
          <strong>Address:</strong> {itemState.user.street}
        </div>
        <div className={classes.description}>
          <strong>City:</strong> {itemState.user.postalCode}{" "}
          {itemState.user.city}
        </div>
      </div>
      <div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`${
              itemState.status === "pending"
                ? classes.pending
                : classes.delivered
            }`}
          >
            {itemState.status}
          </span>
        </div>
        {itemState.status === "pending" && (
          <Button buttonStyle="button--edit" onClick={changeStatusHandler}>
            {isLoading ? "Updating..." : "Deliver"}
          </Button>
        )}
        {error && <p>{error}</p>}
      </div>
    </li>
  );
};

export default OrderedItemInfo;
