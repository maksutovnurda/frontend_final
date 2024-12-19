import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Header />
    <App />
    <Footer />
  </Provider>
);
