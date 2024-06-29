import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { TextEditor } from "./components/index.js";
import { v4 as uuid } from "uuid";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" exact element={<App />}>
      <Route path="" element={<Navigate to={`/documents/${uuid()}`} />} />
      <Route path="documents/:docId" element={<TextEditor />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
