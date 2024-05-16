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
  TeacherCourses,
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
    element: CourseGroups,
  },
  {
    id: 3,
    path: "/:courseId/:courseGroup/attendance" /* it should return breadcrumbs 'Home > CSS 220 > 01-P Attendance' */,
    element: CourseAttendanceTable2,
  },
  {
    id: 4,
    path: "/:courseId/:courseGroup/permissions" /* it should return breadcrumbs 'Home > CSS 220 > 01-P Permissions' */,
    element: Permissions,
  },
  {
    id: 5, // teacher
    path: "/:courseId/:courseGroup/take-attendance" /* it should return breadcrumbs 'Home > CSS 220 > 01-P Take Attendance' */,
    element: TakeAttendance,
  },
  {
    id: 6, // student: for giving permission - teacher: for viewing students
    path: "/:courseId/:courseGroup/students" /* it should return breadcrumbs 'Home > CSS 220 > 01-P Students' */,
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
    id: 5,
    path: "/teachers",
    element: Teachers,
  },
  {
    id: 4,
    path: "/all-courses/:courseId",
    element: AdminCourseGroups,
  },
  {
    id: 8,
    path: "/teachers/:teacherId/courses",
    element: TeacherCourses,
  },
  {
    id: 7,
    path: "/all-courses/:courseId/:courseGroup/students",
    element: AdminStudents,
  },
  {
    id: 6,
    path: "/all-courses/:courseId/:courseGroup/:studentId/attendance",
    element: AdminAttendance,
  },
];
