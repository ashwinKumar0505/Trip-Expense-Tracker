import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
