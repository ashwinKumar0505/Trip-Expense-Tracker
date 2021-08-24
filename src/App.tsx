import { useMediaQuery, Flex } from "@chakra-ui/react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./components/homePage";
import CreateTripForm from "./components/createTripForm";
import EditTripForm from "./components/editTripForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTripName } from "./selectors";

function App() {
  const tripName = useSelector(getTripName);
  const history = useHistory();
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    if (tripName.length !== 0) history.push("/expense-tracker");
  });
  return (
    <Flex direction="column" width="100vw" height="100vh" overflowY="hidden">
      <Header />
      <Flex direction="column" flex={1} minH={0} p={isLargerThan1000 ? 10 : 3}>
        <Switch>
          <Route path="/expense-tracker" exact>
            <HomePage />
          </Route>
          <Route path="/edit-trip-details" exact>
            <EditTripForm />
          </Route>
          <Route path="/create-trip" exact>
            <CreateTripForm />
          </Route>
          <Route path="/">
            <CreateTripForm />
          </Route>
        </Switch>
      </Flex>
    </Flex>
  );
}

export default App;
