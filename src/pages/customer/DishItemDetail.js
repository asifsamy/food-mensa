import { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import dishStyles from "../../components/Dishes/AvailableDishes.module.css";
import DishItem from "../../components/Dishes/DishItem/DishItem";
import Cart from "../../components/Cart/Cart";
import Reviews from "../../components/Reviews/Reviews";

const DishItemDetail = (props) => {
  const [dishItem, setDishItem] = useState({});
  const cartCtx = useContext(CartContext);
  const match = useRouteMatch();
  const params = useParams();
  const { dishId } = params;
  const { isLoading, error, sendRequest: fecthSingleDishItem } = useHttp();

  useEffect(() => {
    const transformDishItem = (dishObj) => {
      setDishItem(dishObj);
    };

    fecthSingleDishItem(
      {
        url: `https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes/${dishId}.json`,
      },
      transformDishItem
    );
  }, [fecthSingleDishItem, dishId]);

  if (isLoading) {
    return (
      <section className={dishStyles.dishesLoading}>
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className={dishStyles.fetchDishesError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>Food Mensa - Delicious Meal</title>
        <meta
          name="description"
          content="Food Mensa. Order your meal and enjoy delicious food."
        />
      </Helmet>
      {cartCtx.cartIsVisible && <Cart hideCart={props.onHideCart} />}
      <section className={dishStyles.dishes}>
        <Card>
          <DishItem
            id={dishId}
            name={dishItem.name}
            description={dishItem.description}
            price={dishItem.price}
          />
        </Card>
        <Route path={match.path} exact>
          <div className="centered">
            <Link className="btn--flat" to={`${match.url}/reviews`}>
              Load Reviews
            </Link>
          </div>
        </Route>
        <Route path={`${match.path}/reviews`}>
          <Reviews />
        </Route>
      </section>
    </Fragment>
  );
};

export default DishItemDetail;
