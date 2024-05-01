import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";
import { customFetch } from "../../utils";
import { useAuthContext } from "../../Context/AuthContext";
import useFetch from "../../Hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";

const CourseDetails = () => {
  // const { courseId } = useParams();
  const courseId = "CSS 217";
  const [course, setCourse] = useState([]);
  const [courseSections, setCourseSections] = useState([]);

  const url = "http://localhost:3002/students/210107190";

  // const { user } = useAuthContext();
  // const url = `/${user.role.toLowerCase()}/attendance/lessons/${courseId}/01-L`;

  // const {
  //   data: attendance,
  //   loading,
  //   error,
  // } = useFetch(url, { method: "GET", headers: {} });

  useEffect(() => {
    const getCourseSections = async () => {
      const res = await fetch(url);
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

  return (
    <MainLayout>
      <div className="course-info">
        <div className="prompt">
          Select section to submit attendance or attendance request!
        </div>
        <h2>Course Name goes here</h2>

        <div className="table-div">
          {courseSections &&
            courseSections.map((section, inx) => (
              <table className="courses-table" key={section.courseSection}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Section</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Attended</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {section.hours &&
                    section.hours.map((hour, inx) => (
                      <tr key={inx}>
                        <td className="course-id">{course.courseId}</td>
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
                        <td
                          className={
                            "apeal-column" + hour.attended ? "" : "apeal"
                          }
                        >
                          {hour.attended ? "" : "Apeal"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetails;
