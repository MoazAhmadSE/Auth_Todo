// import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from './app/store.js';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
        {/* <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}> */}
            <App />
            <ToastContainer theme="dark" />
          {/* </PersistGate>
        </Provider> */}
  </BrowserRouter>
  // </StrictMode>
);
