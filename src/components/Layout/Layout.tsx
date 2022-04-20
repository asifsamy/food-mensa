import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      {/* <Header showCart={props.onShowCart} /> */}
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
