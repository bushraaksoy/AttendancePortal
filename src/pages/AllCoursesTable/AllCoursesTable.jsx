import "./AllCoursesTable.css";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components";
import useFetch from "../../hooks/useFetch";

const AllCoursesTable = () => {
  const navigate = useNavigate();
  const url = `/admin/courses`;

  const {
    data: courses,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });
  console.log(courses);

  const testUrl = "/admin/courses/1/lessons";
  const { data, loading2, error2 } = useFetch(testUrl, {
    method: "GET",
    headers: {},
  });
  console.log("teacher 1 data: ", data);
  return (
    <AdminLayout>
      <>
        <div className="prompt">
          Click on a course to view the course groups!
        </div>
        <h2>Courses</h2>
        <div className="table-div">
          <table className="table hover">
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Course name</th>
                <th>Hours</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, inx) => (
                  <tr
                    id={course.id}
                    key={course.id}
                    onClick={() => {
                      navigate(
                        `/all-courses/${course.id}/groups?name=${course.name}&code=${course.code}`
                      );
                    }}
                  >
                    <td>{inx + 1}</td>
                    <td className="course-id">
                      <Link to={`/${course.code}/students`}>{course.code}</Link>
                    </td>
                    <td>{course.name}</td>
                    <td>{course.total_hours}</td>
                    <td>
                      <div className="view">view</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </AdminLayout>
  );
};
export default AllCoursesTable;
