import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Card from "../ui/Card";

import classes from "./auth-form.module.css";

async function createUser(firstName, lastName, username, password) {

  // call create-user api to process request
  const response = await fetch("/api/auth/create-user", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, username, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  // throw error if new user could not be created
  if (!response.ok) {
    throw new Error(data.message || "Could not create new user");
  }
}

function AuthForm() {

  // create variables to hold values from Auth Form on submit
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  // isLogon is a flag that toggles the form between "Login" and "Create Account"
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    // Toggle isLogin whenever Login/Create Account button is pressed
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault(); // prevent auto-redirect upon submission 

    // grab entered credentials
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // if in Login mode, use signIn() method to request new session
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        username: enteredUsername,
        password: enteredPassword,
      });
      
      // if successful, redirect user to their inventory. Otherwise, log error
      if (!result.error) {
        router.replace("/manager-inventory");
      } else {
        console.log(result.error);
      }
    } else {
      try {
        // If in Create Account mode, obtain remaining input to generate new user
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;

        // call createUser() method to access create-user api
        const result = await createUser(
          enteredFirstName,
          enteredLastName,
          enteredUsername,
          enteredPassword
        );

      } catch (error) {
        console.log(error);
      }

      // if successfull, sign user into new account
      const result = await signIn("credentials", {
        redirect: false,
        username: enteredUsername,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/manager-inventory");
      } else {
        console.log(result.error);
      }
    }
  }

  // return Authentication Form
  return (
    <Card>
      <h1 className={classes.h1}>{isLogin ? "Login" : "Sign Up"}</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              required
              ref={firstNameInputRef}
            />
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required ref={lastNameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default AuthForm;
