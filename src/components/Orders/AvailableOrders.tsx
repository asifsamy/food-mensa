import Card from "../UI/Card";
import classes from "../Dishes/AvailableDishes.module.css";
import useHttp from "../../hooks/use-http";
import { useState, useEffect } from "react";
import OrderedItemInfo from "./OrderedItemInfo";
import LoadingSpinner from "../UI/LoadingSpinner";
import Order from "../../models/orders";

const AvailableOrders: React.FC = (props) => {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);

  const { isLoading, error, sendRequest: fetchAvailableOrders } = useHttp();

  useEffect(() => {
    const transformOrders = (orderObjects: Order[]) => {
      const loadedOrders = [];

      for (const key in orderObjects) {
        loadedOrders.push({
          id: key,
          dishItems: orderObjects[key].dishItems,
          status: orderObjects[key].status,
          user: orderObjects[key].user,
        });
      }
      setAvailableOrders(loadedOrders);
    };
    fetchAvailableOrders(
      {
        url: "https://mensa-app-80da4-default-rtdb.firebaseio.com/orders.json",
      },
      transformOrders
    );
  }, [fetchAvailableOrders]);

  //   console.log(availableOrders);

  const orderedItemList = availableOrders.map((orderedItem) => (
    <OrderedItemInfo
      key={orderedItem.id}
      id={orderedItem.id}
      dishItems={orderedItem.dishItems}
      status={orderedItem.status}
      user={orderedItem.user}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.dishesLoading}>
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.fetchDishesError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.dishes}>
      <Card>
        <ul>{orderedItemList}</ul>
      </Card>
    </section>
  );
};

export default AvailableOrders;
