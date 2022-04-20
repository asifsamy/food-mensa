import React, { useContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
// import Home from "./pages/customer/Home";
import AdminAuth from "./pages/admin/AdminAuth";
import AuthContext from "./store/auth-context";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Home = React.lazy(() => import("./pages/customer/Home"));
const Orders = React.lazy(() => import("./pages/admin/Orders"));
const AllDishes = React.lazy(() => import("./pages/admin/AllDishes"));
const DishItemDetail = React.lazy(() =>
  import("./pages/customer/DishItemDetail")
);
const NotFound = React.lazy(() => import("./pages/customer/NotFound"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/admin" exact>
            {!authCtx.isLoggedIn && <AdminAuth />}
            {authCtx.isLoggedIn && <Orders />}
          </Route>
          {authCtx.isLoggedIn && (
            <Route path="/admin/manage-orders">
              <Orders />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/admin/all-dishes">
              <AllDishes />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/admin/*">
              <NotFound />
            </Route>
          )}
          <Route path="/dishes/:dishId">
            <DishItemDetail />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
