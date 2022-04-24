import { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import AuthForm from "../../components/Auth/AuthForm";
import AuthContext from "../../store/auth-context";
import { type } from "os";

type AuthInput = {
  email: string;
  password: string;
};

const AdminAuth = () => {
  const history = useHistory();
  const [authError, setAuthError] = useState<string>("");
  const authCtx = useContext(AuthContext);

  const authenticationHandler = (inputObj: AuthInput, apiUrl: string) => {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        email: inputObj.email,
        password: inputObj.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Incorrect Email or Password!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/admin/manage-orders");
      })
      .catch((err) => {
        // alert(err.message);
        setAuthError(err.message);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Food Mensa - Admin Authentication</title>
        <meta name="description" content="Admin Authentication" />
      </Helmet>
      <AuthForm authError={authError} onConfirm={authenticationHandler} />
    </Fragment>
  );
};

export default AdminAuth;
