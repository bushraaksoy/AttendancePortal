import {
  Login,
  CoursesTable,
  AttendanceRequests,
  CourseAttendanceTable,
  CourseStudents,
  CourseAttendanceTable2,
  Permissions,
  CourseGroups,
  TakeAttendance,
  TokenAccepting,
  Teachers,
  AdminCourseGroups,
  Students,
  AdminAttendance,
  AdminStudents,
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
  // {
  //   id: 2,
  //   path: "/:courseId/attendance",
  //   element: CourseAttendanceTable,
  // },
  {
    id: 3,
    path: "/:courseId/students",
    element: CourseStudents,
  },
  {
    id: 4,
    path: "/:courseId/:courseGroup/attendance",
    element: CourseAttendanceTable2,
  },
  {
    id: 5,
    path: "/:courseId/:courseGroup/permissions",
    element: Permissions,
  },
  {
    id: 6,
    path: "/:courseId/groups",
    element: CourseGroups,
  },
  {
    id: 7,
    path: ":courseId/:courseGroup/take-attendance",
    element: TakeAttendance,
  },
  {
    id: 8,
    path: "token-accepting",
    element: TokenAccepting,
  },
  {
    id: 9,
    path: "/:courseId/:courseGroup/students",
    element: Students,
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
  {
    id: 4,
    path: "/all-courses/:courseId/groups",
    element: AdminCourseGroups,
  },
  {
    id: 5,
    path: "/teachers",
    element: Teachers,
  },
  {
    id: 6,
    path: "/all-courses/:courseId/:courseGroup/:studentId/attendance",
    element: AdminAttendance,
  },
  {
    id: 6,
    path: "/all-courses/:courseId/:courseGroup/students",
    element: AdminStudents,
  },
];
