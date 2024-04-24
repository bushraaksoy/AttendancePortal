import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";
import { customFetch } from "../../utils";
import { useLoginContext } from "../../Context/LoginContext";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const { user } = useLoginContext();

  const url = `/${user.role.toLowerCase()}/attendance/lessons/1`;

  useEffect(() => {
    const getAttendance = async () => {
      const data = await customFetch(url, {
        method: "GET",
        headers: {},
        mode: "no-cors",
      });
      setAttendance(data);
    };
    getAttendance();
  }, [courseId]);

  console.log(attendance);

  // return (
  //   <div className="course-info">
  //     <div className="prompt">
  //       Select section to submit attendance or attendance request!
  //     </div>
  //     <h2>{course.courseName}</h2>

  //     <div className="table-div">
  //       {courseSections &&
  //         courseSections.map((section, inx) => (
  //           <table className="courses-table" key={section.courseSection}>
  //             <thead>
  //               <tr>
  //                 <th>Code</th>
  //                 {/* <th>Course name</th> */}
  //                 <th>Section</th>
  //                 <th>Time</th>
  //                 <th>Date</th>
  //                 <th>Day</th>
  //                 <th>Attended</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {section.hours &&
  //                 section.hours.map((hour, inx) => (
  //                   <tr key={inx}>
  //                     <td className="course-id">{course.courseId}</td>
  //                     {/* <td>{course.courseName}</td> */}
  //                     <td>{section.courseSection}</td>
  //                     <td>{hour.startTime}</td>
  //                     <td>{hour.date}</td>
  //                     <td>{hour.day}</td>
  //                     <td>
  //                       <div
  //                         className={`text ${
  //                           hour.attended ? "attended" : "absent"
  //                         }`}
  //                       >
  //                         {hour.attended ? "Attended" : "Absent"}
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 ))}
  //             </tbody>
  //           </table>
  //         ))}
  //     </div>
  //   </div>
  // );
};

export default CourseDetails;
