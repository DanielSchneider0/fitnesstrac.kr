import { useState, useEffect } from "react";
import "./Routines.css";

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

const Routines = (props) => {
  const [returnedRoutines, setReturnedRoutines] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [routinesById, setRoutinesById] = useState("");

  const token = props.token;
  //   console.log(props.user.token);
  //   console.log(props.token);

  const routinesId = async (routinesById) => {
    const getRoutinesId = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routinesById}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
        }),
      }
    );
    const response = await getRoutinesId.json();
    setReturnedRoutines(response);
    setRoutineName("");
    setRoutineGoal("");
    returnRoutines();
  };

  const returnRoutines = async () => {
    const getRoutines = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await getRoutines.json();
    console.log(response);
    setReturnedRoutines(response);
  };
  useEffect(() => {
    returnRoutines();
  }, []);

  return (
    <body>
      <div id="welcome">
        {props.user && (
          <h1 style={welcome}>Welcome to Rotuines, {props.user.username}</h1>
        )}
      </div>
      {returnedRoutines.map((routine) => {
        return (
          <div key={routine.id}>
            <h1 style={myStyle}>{routine.name}</h1>
            <h3 style={margin}>Creator: {routine.creatorName}</h3>
            <h4 style={margin}>goal: {routine.goal}</h4>

            {routine.activities.map((activity) => {
              return (
                <div>
                  <p style={margin}>Activities: {activity.name}</p>
                  <p style={margin}>
                    Activity Description: {activity.description}
                  </p>
                  <p style={margin}>Duration: {activity.duration}</p>
                  <p style={margin}>Count: {activity.count}</p>
                </div>
              );
            })}
            {/* {props.user.token === props.token && (
              <form onSubmit={routinesId}>
                <input
                  onChange={(e) => setRoutineName(e.target.value)}
                  type="text"
                  value={routineName}
                  placeholder="Routine Name"
                />
                <br></br>

                <input
                  onChange={(e) => setRoutineGoal(e.target.value)}
                  type="text"
                  value={routineGoal}
                  placeholder="Routine Goal"
                />
                <button
                  onClick={() => {
                    setRoutinesById(routine.id);
                    routinesId(routinesById);
                  }}
                >
                  Edit Routine
                </button>
              </form>
            )} */}
          </div>
        );
      })}
    </body>
  );
};

export default Routines;
