import { Heading, Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import TripTrackingForm from "./components/TripTrackingForm";

function App() {
  return (
    <Box width="100vw" height="100vh" p={10} overflowY="hidden">
      <Heading textAlign="center" marginBottom={10}>
        Trip Expense Tracker
      </Heading>
      <Switch>
        <Route path="/expense-tracker" exact>
          <HomePage />
        </Route>
        <Route path="/">
          <TripTrackingForm />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
