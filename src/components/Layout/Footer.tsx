import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.content}>
        Copyright Ⓒ 2022 Mensa. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
