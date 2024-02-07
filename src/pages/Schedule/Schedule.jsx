import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import "./Schedule.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Schedule = () => {
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/departmentSchedule"
        );
        setSchedule(response.data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="schedule">
      <h1>Schedule</h1>
      <div className="times">
        {Object.entries(schedule).map(([day, times]) => (
          <div className="" key={day}>
            <h3>{day}</h3>
            {Object.entries(times).map(([time, lessons]) => (
              <div className="" key={time}>
                <h6>{time}</h6>
                <ul>
                  {lessons.map((lesson, index) => {
                    <li key={index}>{lesson}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Schedule;

// const { data, pending, error } = useFetch(
//     "http://localhost:3002/departmentSchedule"
//   );

//   if (pending) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return (
//     <div>
//       <h1>Schedule</h1>
//       <div>{}</div>
//     </div>
//   );

{
  /* <div>
  <h1>Schedule</h1>
  <div>
    <h3>{day}</h3>
    <div className="times">
      <h6>{time}</h6>
      <ul>
        <li key={index}>{lesson}</li>;
      </ul>
    </div>
  </div>
</div>; */
}
