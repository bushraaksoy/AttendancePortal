import "./AllCoursesTable.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";

const AllCoursesTable = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const URL = `${API_BASE_URL}/admin/courses`;

  const { token } = useContext(LoginContext);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCourses(data);
    };
    getAllCourses();
  }, []);
  console.log(courses);
  return (
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
              <th>Absence</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, inx) => (
              <tr key={inx}>
                <td>{inx + 1}</td>
                <td className="course-id">
                  <Link to={`/${course.code}/students`}>{course.code}</Link>
                </td>
                <td>{course.name}</td>
                <td>{course.total_hours}</td>
                <td>
                  <div className="absence-percentage-bar"></div>
                  {course.courseAbsence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllCoursesTable;
