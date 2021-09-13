/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import decode from "jwt-decode";

import HomePage from "./components/homePage";
import CreateTripForm from "./components/createTripForm";
import GroupsListPage from "./components/groupListingPage";
import Auth from "./components/auth";
import { useEffect } from "react";
import { getAccessToken } from "./utils/token";
import { useDispatch } from "react-redux";
import { logout } from "./actions/actions";

function App() {
  const location = useLocation();
  const token = getAccessToken();
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      if (!token) logoutUser();
      else {
        const decodedToken: any = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logoutUser();
      }
    }
  }, [location]);
  return (
    <Flex direction="column" width="100vw" height="100vh" overflowY="hidden">
      <Switch>
        <Route path="/expense-tracker" exact>
          <HomePage />
        </Route>
        <Route path="/create-group" exact>
          <CreateTripForm />
        </Route>
        <Route path="/my-groups" exact>
          <GroupsListPage />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Flex>
  );
}

export default App;
