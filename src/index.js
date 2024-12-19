import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { Provider } from "react-redux";
import { store } from "./store/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </RouterProvider>
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
