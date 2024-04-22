import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import ClassTimeTablePage from "./pages/ClassTimeTable";
import ClassMoney from "./pages/ClassMoney";
import CreateHW from "./pages/CreateHW";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { DevTesting } from "./pages/DevTesting";
import { App, ConfigProvider } from "antd";
import locale from "antd/locale/hu_HU";
import "dayjs/locale/hu";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/timetable",
    element: <ClassTimeTablePage />,
  },
  {
    path: "/money",
    element: <ClassMoney />,
  },
  {
    path: "/create",
    element: <CreateHW />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/devtesting",
    element: <DevTesting />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={locale}>
    <React.StrictMode>
      <App>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={mainRouter} />
        </ThemeProvider>
      </App>
    </React.StrictMode>
  </ConfigProvider>
);
