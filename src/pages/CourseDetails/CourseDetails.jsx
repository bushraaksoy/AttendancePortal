import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseSections, setCourseSections] = useState([]);

  useEffect(() => {
    const getCourseSections = async () => {
      const res = await fetch("http://localhost:3002/students/210107190");
      const student = await res.json();
      const course = student.courses.find(
        (course) => course.courseId === courseId
      );
      setCourse(course);
      const sections = course && course.sections;
      setCourseSections(sections);
    };
    getCourseSections();
    console.log(courseSections);
  }, [courseId]);

  return (
    <div className="course-details">
      <h1>{course.courseName}</h1>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Course name</th>
            <th>Course section</th>
            <th>Course time</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {courseSections &&
            courseSections.map((section, inx) => (
              <tr key={inx}>
                <td className="course-id">{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{section.courseSection}</td>
                <td>{section.startTime}</td>
                <td>true</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseDetails;
