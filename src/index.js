import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import App from "./components/App";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers"
import { Provider } from "react-redux";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunkMiddleware))}>
    <App />
  </Provider>,
  document.getElementById("root")
);
