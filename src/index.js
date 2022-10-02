import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { AllHomeWorks } from './pages/AllHomeWorks';
import ClassTimeTablePage from "./pages/ClassTimeTable"

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/timetable",
    element: <ClassTimeTablePage />,
  },
  // {
  //   path: "/homeworks",
  //   element: <AllHomeWorks />
  // }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={mainRouter} />
  </React.StrictMode>
);
