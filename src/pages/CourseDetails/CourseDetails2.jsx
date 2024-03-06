import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

const CourseDetails2 = () => {
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
      const sections = course && course.sections2;
      setCourseSections(sections);
    };
    getCourseSections();
    console.log(courseSections);
  }, [courseId]);

  console.log(courseSections);
  return (
    <div className="course-info">
      <div className="prompt">
        Select section to submit attendance or attendance request!
      </div>
      <h1>{course.courseName}</h1>

      {courseSections &&
        courseSections.map((section, inx) => (
          <table key={section.courseSection} className="courses-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course name</th>
                <th>Section</th>
                <th>Time</th>
                <th>Date</th>
                <th>Day</th>
                <th>Attended</th>
              </tr>
            </thead>
            <tbody>
              {section.hours &&
                section.hours.map((hour, inx) => (
                  <tr key={inx}>
                    <td className="course-id">{course.courseId}</td>
                    <td>{course.courseName}</td>
                    <td>{section.courseSection}</td>
                    <td>{hour.startTime}</td>
                    <td>{hour.date}</td>
                    <td>{hour.day}</td>
                    <td>
                      <div
                        className={`text ${
                          hour.attended ? "attended" : "absent"
                        }`}
                      >
                        {hour.attended ? "Attended" : "Absent"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default CourseDetails2;
