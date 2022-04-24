import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dishes from "../../../models/dishes";

import CartContext from "../../../store/cart-context";
import Rating from "../../Reviews/Rating";
import classes from "./DishItem.module.css";
import DishItemActions from "./DishItemActions";
import DishItemForm from "./DishItemForm";

const DishItem: React.FC<{
  id: string;
  name: string;
  price: number;
  description: string;
  onDeleteItem?: (id: string) => void;
  // onDeleteItem: (id: string) => void;
}> = (props) => {
  // state declaration to show update value in client site
  const [itemState, setItemState] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    description: props.description,
  });

  const location = useLocation();
  const urlPattern = /admin+\W*/;
  const adminUrl = urlPattern.test(location.pathname);

  const price = `€${Number(itemState.price).toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const dishItem = {
    id: itemState.id,
    name: itemState.name,
    price: itemState.price,
    description: itemState.description,
  };

  // update value in client site -- not in server site
  const updateItemHandler = (updatedItem: Dishes) => {
    setItemState(updatedItem);
  };

  return (
    <li className={classes.dish}>
      <div>
        {adminUrl ? (
          <h3>{itemState.name}</h3>
        ) : (
          <Link to={`/dishes/${props.id}`}>
            <h3>{itemState.name}</h3>
          </Link>
        )}
        <div className={classes.description}>{itemState.description}</div>
        <div className={classes.price}>{price}</div>
        <Rating dishItemId={props.id} />
      </div>
      <div>
        {adminUrl && (
          <DishItemActions
            item={dishItem}
            onUpdateItem={updateItemHandler}
            // one state up to its' parent component
            onDelete={props.onDeleteItem!(props.id) as any}
            // onDelete={props.onDeleteItem.bind(null, props.id)}
          />
        )}
        {!adminUrl && (
          <DishItemForm id={props.id} onAddToCart={addToCartHandler} />
        )}
      </div>
    </li>
  );
};

export default DishItem;
