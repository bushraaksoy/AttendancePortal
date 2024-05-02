import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const CourseGroups = () => {
  const { courseId } = useParams();

  const url = `/api/v1/teacher/courses/${courseId}/lessons`;
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  return <div>CourseGroups</div>;
};

export default CourseGroups;
