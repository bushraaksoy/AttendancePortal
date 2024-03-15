import "./AllCoursesTable.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCoursesTable = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getAllCourses = async () => {
      const res = await fetch("http://localhost:3002/courses");
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
              <th>ECTS</th>
              <th>Absence</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, inx) => (
              <tr key={inx}>
                <td>{inx + 1}</td>
                <td className="course-id">
                  <Link to={`/${course.courseId}/students`}>
                    {course.courseId}
                  </Link>
                </td>
                <td>{course.courseName}</td>
                <td>{course.courseEcts}</td>
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
