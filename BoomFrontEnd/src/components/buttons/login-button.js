import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import MyButton from "./button";


export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/user/me",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <MyButton value='Sign In' click={handleLogin} />
  );
};
