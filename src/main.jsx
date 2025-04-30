import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/useUserContext.jsx";
import { TaskProvider } from "./context/useTasksContext.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UserProvider>
      <TaskProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </TaskProvider>
    </UserProvider>
  </BrowserRouter>
  // </StrictMode>
);
