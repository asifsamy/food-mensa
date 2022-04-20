import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Header.module.css";
import headerImage from "../../assets/meal.jpg";
import HeaderCartButton from "./HeaderCartButton";
import AdminNav from "./AdminNav";

const Header = () => {
  const location = useLocation();
  const urlPattern = /admin+\W*/; // logic might have error
  const adminUrl = urlPattern.test(location.pathname);
  // console.log(r.test(location.pathname));
  return (
    <Fragment>
      <header
        className={`${classes.header} ${
          !adminUrl ? classes["header-fixed"] : ""
        }`}
      >
        <Link to="/">
          <h2>Mensa - Order Your Meal</h2>
        </Link>
        {adminUrl && <AdminNav />}
        {!adminUrl && <HeaderCartButton />}
      </header>
      {!adminUrl && (
        <div className={classes["main-image"]}>
          <img src={headerImage} alt="A dish of Buffe!" />
        </div>
      )}
    </Fragment>
  );
};

export default Header;
