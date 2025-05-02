import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/useUserContext.jsx";
import { TaskProvider } from "./context/useTasksContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UserProvider>
      <TaskProvider>
        <App />
        <ToastContainer theme="dark" />
      </TaskProvider>
    </UserProvider>
  </BrowserRouter>
  // </StrictMode>
);
