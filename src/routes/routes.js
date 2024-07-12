import { lazy } from "react";
const LoginAndSignUp = lazy(() => import("../screens/loginSignUp"));
const DepartmentManager = lazy(() => import("../screens/department"));

export const routes = [
  {
    name: "home",
    path: "/",
    Element: LoginAndSignUp,
  },
  {
    name: "home",
    path: "/create-department",
    Element: DepartmentManager,
  },
];

// export { LoginAndSignUp, DepartmentManager };
