import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ClassTimeTablePage from "./pages/ClassTimeTable"
import ClassMoney from "./pages/ClassMoney"
import CreateHW from './pages/CreateHW';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={mainRouter} />
    </ThemeProvider>
  </React.StrictMode>
);
