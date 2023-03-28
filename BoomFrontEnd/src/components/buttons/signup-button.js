import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { getNewUserResource } from "../../services/message.service";
import MyButton from "./button";

export const SignupButton = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <MyButton value='Sign Up' click={handleSignUp}/>
  );
};
