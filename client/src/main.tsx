import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./app/store.ts";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} pauseOnHover theme="light" transition={Bounce} />
    </Provider>
  </StrictMode>,
);
