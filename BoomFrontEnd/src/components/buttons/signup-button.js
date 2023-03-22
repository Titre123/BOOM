import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { getNewUserResource } from "../../services/message.service";

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
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getNewUserResource(accessToken);
    if (error) console.log(error);
    console.log(data);
  };

  return (
    <button className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};
