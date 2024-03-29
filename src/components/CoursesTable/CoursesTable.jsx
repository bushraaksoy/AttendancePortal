import React, { useEffect, useState } from "react";
import "./CoursesTable.css";
import { Link } from "react-router-dom";

// we have to get token from local storage
// {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     // Bearer schema is commonly used for Authorization
//     'Authorization': `Bearer ${token}`
// }

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("http://localhost:3002/students/210107190");
      const student = await res.json();
      setCourses(student.courses);
    };
    getCourses();
  }, []);

  return (
    <div className="course-info">
      <div className="prompt">Select course to take attendance!</div>
      <h2>Courses</h2>
      <div className="table-div">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course name</th>
              <th>ECTS</th>
              <th>Absence</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, inx) => (
              <tr key={inx}>
                <td className="course-id">
                  <Link to={`/${course.courseId}`}>{course.courseId}</Link>
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

export default CoursesTable;
