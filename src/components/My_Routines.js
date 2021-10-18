import { useEffect, useState } from "react";
import "./My_Routines.css";
const MyRoutines = (props) => {
  const username = props.user.username;
  const token = props.token;
  const [routineId, setRoutineId] = useState("");
  const UID = props.user.id;
  const [returnedRoutines, setReturnedRoutines] = useState([]);

  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");

  const updateRoutine = async (routineId) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`
    );
  };

  const deleteRoutine = async (routineId) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getRoutines();
  };

  const addRoutine = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          creatorId: UID,
          name: routineName,
          goal: routineGoal,
          isPublic: true,
        }),
      }
    );

    setRoutineGoal("");
    setRoutineName("");
    getRoutines();
  };
  const getRoutines = async () => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rawRoutines = await resp.json();
    setReturnedRoutines(rawRoutines);
  };
  useEffect(() => {
    getRoutines();
  }, []);
  return (
    <>
      <div class="routineItem">
        <>
          <form onSubmit={addRoutine}>
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
              placeholder="Goal"
            />
            <br></br>
            <button type="submit">Add Routine</button>
          </form>
        </>
      </div>
      <div id="routines" className="postMain">
        <div id="routinesContainer">
          {returnedRoutines.map((routine) => {
            return (
              <>
                {routine.isPublic && (
                  <div className="routineItem" key={routine.id}>
                    <h3>Routine Name: {routine.name}</h3>
                    <p>Goal: {routine.goal}</p>
                    <p>Creator: {routine.creatorName}</p>
                    <button
                      onClick={() => {
                        setRoutineId(routine.id);
                        deleteRoutine(routineId);
                      }}
                    >
                      Double click to Delete Post
                    </button>
                    <div>
                      {routine.activities.map((activity) => {
                        return (
                          <>
                            <h3>Activity</h3>
                            <h3>Name: {activity.name}</h3>
                            <p>Desc: {activity.description}</p>
                            <p>Duration: {activity.duration}</p>
                            <p>Count: {activity.count}</p>
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MyRoutines;
