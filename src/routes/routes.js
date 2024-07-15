import { lazy } from "react";
const LoginAndSignUp = lazy(() => import("../screens/loginSignUp"));
const Department = lazy(() => import("../screens/createDepartment"));
const Employees = lazy(() => import("../screens/employees"));
const PageNotFound = lazy(() => import("../components/PageNotFound"));
const Departments = lazy(() => import("../screens/departmentList"));

export const routes = [
  {
    name: "NotFound",
    path: "/*",
    Element: PageNotFound,
  },
  {
    name: "home",
    path: "/",
    Element: LoginAndSignUp,
  },
  {
    name: "Create Department",
    path: "/create-department",
    Element: Department,
  },
  {
    name: "Department",
    path: "/department-list",
    Element: Departments,
  },
  {
    name: "Employees List",
    path: "/employees-list",
    Element: Employees,
  },
];
