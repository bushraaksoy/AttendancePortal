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

  const testUrl = "/admin/courses/2/lessons";
  const { data, loading2, error2 } = useFetch(testUrl, {
    method: "GET",
    headers: {},
  });
  console.log("course 2 data: ", data);
  if (loading)
    return (
      <AdminLayout>
        <img width={50} src="https://i.gifer.com/ZKZg.gif" />
      </AdminLayout>
    );
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
                <th>Id</th>
                <th>Code</th>
                <th>Course name</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, inx) => (
                  <tr
                    key={course.id}
                    onClick={() =>
                      navigate(
                        `/all-courses/${course.id}/groups?code=${course.code}&name=${course.name}`
                      )
                    }
                  >
                    <td>{course.id}</td>
                    <td>
                      <Link
                        to={`/all-courses/${course.id}/groups?code=${course.code}&name=${course.name}`}
                      >
                        {course.code}
                      </Link>
                    </td>
                    <td>{course.name}</td>
                    <td>{course.total_hours}</td>
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
