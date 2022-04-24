import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import Cart from "../../components/Cart/Cart";
import Dishes from "../../components/Dishes/Dishes";
import CartContext from "../../store/cart-context";

const Home: React.FC = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <Fragment>
      <Helmet>
        <title>Food Mensa - Home</title>
        <meta
          name="description"
          content="Food Mensa. Order your meal and enjoy delicious food."
        />
      </Helmet>
      {cartCtx.cartIsVisible && <Cart />}
      <Dishes />
    </Fragment>
  );
};

export default Home;
