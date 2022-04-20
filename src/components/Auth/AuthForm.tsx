import { useState } from "react";
import useInput from "../../hooks/use-input";
import Input from "../UI/FormFields/Input";
import classes from "./AuthForm.module.css";

type AuthUser = {
  email: string;
  password: string;
};

const isEmail = (value: string) =>
  value.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
const isValidPass = (value: string) =>
  value.trim() !== "" && value.trim().length > 5;

const AuthForm: React.FC<{
  authError: string;
  onConfirm: (user: AuthUser, url: string) => void;
}> = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isValidPass);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // if (!formIsValid) {
    //   return;
    // }

    const apiKey = "AIzaSyC8h6pqOPTYrV8wlv817cMUgebofmZT46c";
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }
    props.onConfirm(
      {
        email: emailValue,
        password: passwordValue,
      },
      url
    );
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <Input
          label="Your Email"
          id="email"
          type="text"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          errorStyling={emailHasError}
        />
        {emailHasError && (
          <p className={classes.invalid}>Please enter a valid email!</p>
        )}

        <Input
          label="Your Password"
          id="password"
          type="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          errorStyling={passwordHasError}
        />
        {passwordHasError && (
          <p className={classes.invalid}>
            Please enter a password at least 6 charecters!
          </p>
        )}

        <div className={classes.actions}>
          {/* {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>} */}
          <button disabled={!formIsValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {props.authError && (
            <p className={classes.invalid}>{props.authError}</p>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
