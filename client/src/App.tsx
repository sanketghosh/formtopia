// packages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import { MainLayout } from "@/layouts";
import {
  Account,
  AllForms,
  Auth,
  CreateForm,
  Dashboard,
  Landing,
  Notifications,
  Settings,
  SingleFormData,
  Statistics,
} from "@/pages";

// routes
const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/single-form-data/:id",
        element: <SingleFormData />,
      },
      {
        path: "/create-form",
        element: <CreateForm />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/all-forms",
        element: <AllForms />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
