import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import ButtonContext from "../context/ButtonContext";
import { SendDataProvider } from "../context/SendDataContext";
import { DateRangeProvider } from "../context/DateRangeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SendDataProvider>
      <DateRangeProvider>
        <RouterProvider router={router}></RouterProvider>
      </DateRangeProvider>
    </SendDataProvider>
  </StrictMode>
);
