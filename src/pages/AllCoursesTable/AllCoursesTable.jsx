import "./AllCoursesTable.css";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components";
import useFetch from "../../hooks/useFetch";

const AllCoursesTable = () => {
  const url = `/admin/courses`;

  const {
    data: courses,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log(courses);

  return (
    <AdminLayout>
      <div className="course-info">
        <h2>Courses</h2>
        <div className="table-div">
          <table className="courses-table">
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
                  <tr id={course.id} key={course.id}>
                    <td>{inx + 1}</td>
                    <td className="course-id">
                      <Link to={`/${course.code}/students`}>{course.code}</Link>
                    </td>
                    <td>{course.name}</td>
                    <td>{course.total_hours}</td>
                    <td>view</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AllCoursesTable;
