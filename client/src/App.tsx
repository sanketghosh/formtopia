// packages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import { MainLayout } from "@/layouts";
import {
  Account,
  AllForms,
  Auth,
  FormBuilder,
  Dashboard,
  Error,
  Landing,
  Notifications,
  Settings,
  SingleFormData,
  Statistics,
} from "@/pages";
import { AuthRedirect, PrivateRoute } from "@/routes";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

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
        <Suspense fallback={<PageLoader />}>
          <MainLayout />
        </Suspense>
      </PrivateRoute>
    ),
    /*  loader: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate data fetch
      return {};
      // this is for react router dom's page loader implementation
    }, */
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
        element: <FormBuilder />,
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
  return (
    <RouterProvider
      router={routes}
      // fallbackElement={<Loader />} // if i wanna implement loader using react router dom
    />
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2Icon className="size-12 animate-spin text-muted-foreground" />
        <p>Loading page...</p>
      </div>
    </div>
  );
}
