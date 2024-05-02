import "./CoursesTable.css";
import { Link } from "react-router-dom";
import { useAuthcontext } from "../../context/AuthContext";
import useFetch from "../../Hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import { formatDateAndTime } from "../../utils";

const CoursesTable = () => {
  const { user } = useAuthContext();
  const url = `/${user.role.toLowerCase()}/courses`;

  const {
    data: courses,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log(courses);

  return (
    <MainLayout>
      <>
        <div className="prompt">Select course to take attendance!</div>
        <h2>Courses</h2>
        <div className="table-div">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course name</th>
                <th>Hours</th>
                <th>Groups</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course) => (
                  <tr id={course.id} key={course.id}>
                    <td className="course-id">
                      {
                        <Link
                          to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                        >
                          {course.code}
                        </Link>
                      }
                    </td>
                    <td>{course.name}</td>
                    <td>{course.total_hours}</td>

                    <td>
                      <div className="view">
                        <Link
                          to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                        >
                          view
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </MainLayout>
  );
};

export default CoursesTable;
