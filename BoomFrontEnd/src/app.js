import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect} from "react";
import HomePage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
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

export const MyLoginInfo = React.createContext();
export const App = () => {  
  const [userId, setuserId] = useState('');
  console.log(userId);
    // if (isLoading) {
  //   return (
  //     <div className="page-layout">
  //       <PageLoader />
  //     </div>
  //   );
  // }

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
    <MyLoginInfo.Provider value={[userId, setuserId]}>
      <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/me" element={<Dashboard />} />
      </Routes>
      </div>
    </MyLoginInfo.Provider>
  );
};
