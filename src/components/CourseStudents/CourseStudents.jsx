import { useEffect, useState } from "react";
import "./CourseStudents.css";
import { useParams } from "react-router-dom";

const CourseStudents = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const URL = `${API_BASE_URL}/admin/courses/${courseId}`;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`http://localhost:3002/courses`);
      const data = await res.json();
      const course = data.find((course) => course.courseId == courseId);
      setCourse(course);
    };

    fetchCourse();
  }, [courseId]);

  // TODO: fetch from endpoint of URL and see what it returns, let me go and pray...

  return (
    <div className="course-info">
      <h2>Students in course {courseId}</h2>
      <div className="table-div">
        <table className="courses-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Absence</th>
            </tr>
          </thead>
          <tbody>
            {course &&
              course.students &&
              course.students.map((student, inx) => (
                <tr key={inx}>
                  <td>{inx + 1}</td>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>{student.absence}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseStudents;

// import React, { useEffect } from "react";
// import "./StudentsTable.css";
// import { useParams } from "react-router-dom";

// const StudentsTable = () => {
//   const { courseId } = useParams();
//   useEffect(() => {
//     const getStudents = async () => fetch("http://localhost:3002/courses");
//   }, []);
//   return <div>StudentsTable</div>;
// };

// export default StudentsTable;
