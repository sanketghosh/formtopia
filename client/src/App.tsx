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
  Error,
  Landing,
  Notifications,
  Settings,
  SingleFormData,
  Statistics,
} from "@/pages";
import { AuthRedirect, PrivateRoute } from "@/routes";

// routes
const routes = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthRedirect>
        <Auth />
      </AuthRedirect>
    ),
  },
  {
    path: "/",
    element: (
      <AuthRedirect>
        <Landing />
      </AuthRedirect>
    ),
  },
  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
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
        path: "/create-form/:id",
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
  {
    path: "*",
    element: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
