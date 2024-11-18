// packages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import { MainLayout } from "@/layouts";
import { Auth, Dashboard, Landing, SingleFormData } from "@/pages";

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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
