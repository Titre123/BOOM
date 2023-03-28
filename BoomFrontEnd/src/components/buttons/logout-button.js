import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import MyButton from "./button";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <MyButton value='Sign Out' click={handleLogout}/>
  );
};
