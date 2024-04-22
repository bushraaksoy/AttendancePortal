import "./AllCoursesTable.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customFetch } from "../../utils";

const AllCoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const url = `/admin/courses`;

  useEffect(() => {
    const getAllCourses = async () => {
      const data = await customFetch(url, { method: "GET", headers: {} });
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
