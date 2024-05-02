import React from "react";
import "./CourseGroups.css";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import { FaEye, FaPencilAlt } from "react-icons/fa";

const CourseGroups = () => {
  const { courseId } = useParams();

  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const url = `/teacher/courses/${courseId}/lessons`;
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const handleViewClick = (id) => {
    console.log("View Clicked for:", id);
    // Add navigation logic or further actions here
  };

  const handleTakeClick = (id) => {
    console.log("Take Clicked for:", id);
    // Add logic for taking attendance here
  };

  console.log(`Lessons for ${courseCode}: `, lessons);
  return (
    <MainLayout>
      <>
        <div className="prompt">View course groups!</div>
        <h2>{courseName}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Group</th>
              <th>Day</th>
              <th>Time</th>
              <th>Teacher</th>
              <th>Students</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {lessons &&
              lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{courseCode}</td>
                  <td>{lesson.group}</td>
                  <td>{lesson.dayOfWeek}</td>
                  <td>{lesson.dayOfWeek}</td>
                  <td>{lesson.teacher}</td>
                  <td>
                    <div className="view">view</div>
                  </td>
                  <td className="attendance-actions">
                    <button
                      title="View lesson attendance records"
                      onClick={() => handleViewClick(lesson.id)}
                      className="icon-button eye"
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Take attendance for lesson"
                      onClick={() => handleTakeClick(lesson.id)}
                      className="icon-button pencil"
                    >
                      <FaPencilAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </MainLayout>
  );
};

export default CourseGroups;
