import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/es/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById("root")
);
