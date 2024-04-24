import { Login, CoursesTable } from "../components";

export const publicRoutes = [
  {
    id: 1,
    path: "/login",
    element: Login,
  },
  {
    id: 2,
    path: "/",
    element: CoursesTable,
  },
];
