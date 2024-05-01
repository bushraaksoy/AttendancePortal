import {
  Login,
  CoursesTable,
  AttendanceRequests,
  CourseDetails,
  CourseStudents,
} from "../components";
import { AllCoursesTable, Dashboard } from "../pages";

export const publicRoutes = [
  {
    id: 1,
    path: "/login",
    element: Login,
  },
];

export const userRoutes = [
  {
    id: 1,
    path: "/",
    element: CoursesTable,
  },
  {
    id: 2,
    path: "/:courseId",
    element: CourseDetails,
  },
  {
    id: 3,
    path: "/:courseId/students",
    element: CourseStudents,
  },
];

export const adminRoutes = [
  {
    id: 1,
    path: "/attendance-requests",
    element: AttendanceRequests,
  },
  {
    id: 2,
    path: "/dashboard",
    element: Dashboard,
  },
  {
    id: 3,
    path: "/all-courses",
    element: AllCoursesTable,
  },
];
