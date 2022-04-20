import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AdminNav.module.css";

const AdminNav = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <NavLink activeClassName={classes.active} to="/admin/manage-orders">
              Manage Orders
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink activeClassName={classes.active} to="/admin/all-dishes">
              All Dishes
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/admin" onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AdminNav;
