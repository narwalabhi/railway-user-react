import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import App from "./components/App";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStore(reducers, applyMiddleware(thunkMiddleware))}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
