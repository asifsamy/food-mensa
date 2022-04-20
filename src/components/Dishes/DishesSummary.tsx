import classes from "./DishesSummary.module.css";

const DishesSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Your Food is Ready by Some Clicks</h2>
      <p>
        Choose your favorite dish from our broad selection of available dishes
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our dishes are cooked with high-quality ingredients, just-in-time
        and of course by experienced chefs!
      </p>
    </section>
  );
};

export default DishesSummary;
