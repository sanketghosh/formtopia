import { lazy } from "react";

/*  import Dashboard from "@/pages/dashboard";
import SingleFormData from "@/pages/single-form-data";
import CreateForm from "@/pages/create-form";
import Statistics from "@/pages/statistics";
import AllForms from "@/pages/all-forms";
import Notifications from "@/pages/notifications";
import Settings from "@/pages/settings";
import Account from "@/pages/account"; */
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import Error from "@/pages/error";

// lazy loadings
const Dashboard = lazy(() => import("./dashboard"));
const SingleFormData = lazy(() => import("./single-form-data"));
const FormBuilder = lazy(() => import("./form-builder"));
const Statistics = lazy(() => import("./statistics"));
const AllForms = lazy(() => import("./all-forms"));
const Notifications = lazy(() => import("./notifications"));
const Settings = lazy(() => import("./settings"));
const Account = lazy(() => import("./account"));

export {
  Auth,
  Error,
  Dashboard,
  Landing,
  SingleFormData,
  FormBuilder,
  Statistics,
  AllForms,
  Notifications,
  Settings,
  Account,
};
