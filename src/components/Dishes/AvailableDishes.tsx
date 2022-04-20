import { useState, useEffect, Fragment } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import NewDishItem from "../../components/Dishes/DishItem/NewDishItem";
import classes from "./AvailableDishes.module.css";
import DishItem from "./DishItem/DishItem";
import { useLocation } from "react-router-dom";
import Dishes from "../../models/dishes";

const AvailableDishes = () => {
  const [availableDishes, setAvailableDishes] = useState<Dishes[]>([]);
  const [callNewDish, setCallNewDish] = useState(false);

  const location = useLocation();
  const urlPattern = /admin+\W*/;
  const adminUrl = urlPattern.test(location.pathname);

  // Destructuring from useHttp custom hook for processing get request (fetch data)
  const { isLoading, error, sendRequest: fetchAvailableDishes } = useHttp();

  useEffect(() => {
    const transformDishes = (dishObj: Dishes[]) => {
      const loadedDishes = [];

      for (const key in dishObj) {
        loadedDishes.push({
          id: key,
          name: dishObj[key].name,
          description: dishObj[key].description,
          price: dishObj[key].price,
        });
      }
      setAvailableDishes(loadedDishes);
    };

    fetchAvailableDishes(
      {
        url: "https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes.json",
      },
      transformDishes
    );
  }, [fetchAvailableDishes]);

  const deleteItemHandler = (deletedId: string) => {
    const newAvailableDishes = [...availableDishes];
    const index = availableDishes.findIndex(
      (availableDish) => availableDish.id === deletedId
    );
    newAvailableDishes.splice(index, 1);
    setAvailableDishes(newAvailableDishes);
  };

  const dishesList = availableDishes.map((dish) => (
    <DishItem
      id={dish.id}
      key={dish.id}
      name={dish.name}
      description={dish.description}
      price={dish.price}
      onDeleteItem={deleteItemHandler}
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

  const newDishCompHandler = () => {
    setCallNewDish(true);
  };

  const newDishItemAddedHandler = (addedNewItem: Dishes) => {
    setAvailableDishes((prevState) => prevState.concat(addedNewItem));
  };

  // In order to show add item form
  const addDishItemUI = (
    <Fragment>
      {callNewDish && (
        <NewDishItem
          onAddNewDishItem={newDishItemAddedHandler}
          callNewDishState={setCallNewDish}
        />
      )}
      <div className="centered">
        <button
          className="uni-button"
          type="button"
          onClick={newDishCompHandler}
        >
          Add a New Dish Item
        </button>
      </div>
      <h2 className="centered">All Available Dish Items</h2>
    </Fragment>
  );

  return (
    <Fragment>
      {adminUrl && addDishItemUI}
      <section className={classes.dishes}>
        <Card>
          <ul>{dishesList}</ul>
        </Card>
      </section>
    </Fragment>
  );
};

export default AvailableDishes;
