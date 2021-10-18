import { useEffect, useState } from "react";
import "./Activities.css";

const myStyle = {
  fontFamily: "sans-serif",
  paddingRight: "50px",
  color: "rgba(73, 63, 252, 100%)",
  fontSize: "2.7rem",
  marginLeft: "10%",
};

const margin = {
  marginLeft: "10%",
};
const welcome = {
  textAlign: "center",
  fontFamily: "sans-serif",
  fontSize: "4rem",
  color: "rgba(73, 63, 252, 60%)",
};

const Activities = (props) => {
  const [returnedActivity, setReturnedActivity] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const token = props.token;

  const patchActivity = async (activityId) => {
    const patch = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      }
    );
    setActivityName("");
    setActivityDescription("");
    getActivities();
  };

  const newActivity = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      }
    );
    setActivityName("");
    setActivityDescription("");
    getActivities();
  };
  const getActivities = async () => {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const info = await response.json();
    console.log(info);
    setReturnedActivity(info);
  };
  useEffect(() => {
    getActivities();
  }, []);
  return (
    <>
      {" "}
      <body>
        <div>
          {props.user && (
            <h1 style={welcome}>
              Welcome to Activities, {props.user.username}
            </h1>
          )}
        </div>
        <>
          {" "}
          <div id="form">
            <form onSubmit={newActivity}>
              <input
                onChange={(e) => setActivityName(e.target.value)}
                type="text"
                value={activityName}
                placeholder="Activity Name"
              />
              <br></br>

              <input
                onChange={(e) => setActivityDescription(e.target.value)}
                type="text"
                value={activityDescription}
                placeholder="Activity Description"
              />
              <br></br>
              <button type="submit">Add Activity</button>
            </form>
          </div>
        </>
        {returnedActivity.map((activity) => {
          return (
            <div>
              <h1 style={myStyle}>{activity.name}</h1>
              <h4 style={margin}>Description: {activity.description}</h4>
            </div>
          );
        })}
      </body>
    </>
  );
};
export default Activities;
