import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/useUserContext.jsx";
import { TaskProvider } from "./context/useTasksContext.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UserProvider>
      <TaskProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TaskProvider>
    </UserProvider>
  </BrowserRouter>
  // </StrictMode>
);
