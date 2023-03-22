import { useAuth0 } from "@auth0/auth0-react";
import {React, useState, useEffect} from "react";
// import { Route, Routes } from "react-router-dom";
// import { PageLoader } from "./components/page-loader";
// import { AuthenticationGuard } from "./components/authentication-guard";
// import { AdminPage } from "./pages/admin-page";
// import { CallbackPage } from "./pages/callback-page";
// import { HomePage } from "./pages/home-page";
// import { NotFoundPage } from "./pages/not-found-page";
// import { ProfilePage } from "./pages/profile-page";
// import { ProtectedPage } from "./pages/protected-page";
// import { PublicPage } from "./pages/public-page";
// import { PageLoader } from './components/page-loader'
import { LoginButton } from "./components/buttons/login-button";
import { SignupButton } from "./components/buttons/signup-button";
import { LogoutButton } from "./components/buttons/logout-button";
import { getProtectedResource } from "./services/message.service";
import SongForm from "./pages/postSong";

export const App = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState();
  
  // if (isLoading) {
  //   return (
  //     <div className="page-layout">
  //       <PageLoader />
  //     </div>
  //   );
  // }

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);
  return (
    // <Routes>
    //   <Route path="/" element={<HomePage />} />
    //   <Route
    //     path="/profile"
    //     element={<AuthenticationGuard component={ProfilePage} />}
    //   />
    //   <Route path="/public" element={<PublicPage />} />
    //   <Route
    //     path="/protected"
    //     element={<AuthenticationGuard component={ProtectedPage} />}
    //   />
    //   <Route
    //     path="/admin"
    //     element={<AuthenticationGuard component={AdminPage} />}
    //   />
    //   <Route path="/callback" element={<CallbackPage />} />
    //   <Route path="*" element={<NotFoundPage />} />
    // </Routes>
    <div>
      <LoginButton />
      <LogoutButton />
      <SignupButton />

      <p>{message}</p>
      {
        isAuthenticated && <SongForm />
      }
    </div>
  );
};
