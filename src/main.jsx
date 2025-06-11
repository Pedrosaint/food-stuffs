import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./config/routes.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { SkeletonTheme } from "react-loading-skeleton";

const router = appRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkeletonTheme color="#cacaca" highlightColor="rgba(255, 255, 254, 0.9)">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </Provider>
    </SkeletonTheme>
  </React.StrictMode>
);
