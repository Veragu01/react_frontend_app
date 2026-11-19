import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/esm/Nav";
import {BASEURL} from "../Constraints";

function FetchTimeslots(props) {
  const [timeslots, setTimeslots] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("")
  const [userType, setUserType] = useState("")

function fetchTimeslots() {
  const token = localStorage.getItem("token");
  const user_type = localStorage.getItem("user_type");
  setToken(token)
  setUserType(user_type)
  console.log("Token exists:", Boolean(token)); // Don't log the token itself.

  axios
    .get(`${BASEURL}/api/timeslots/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
        const data = response.data;
        setTimeslots(Array.isArray(data) ? data : data.results ?? []);
    })
    .catch((error) => {
      console.error(error.response?.status, error.response?.data);
      setError("Could not load timeslots.");
    });
}

  useEffect(() => {
    fetchTimeslots();
  }, []);

  return (
    <div>
      <h1>Timeslots</h1>

      {error && <p>{error}</p>}
      {token && userType === "doctor" && (<Link  to={"/timeslots/create"}  className="btn btn-primary">Create New Timeslot</Link>)}


      <ul>
        {timeslots.map((timeslot) => (
          <div key={timeslot.id}>
            Date: {timeslot.date} Time: {timeslot.time}    {timeslot.is_available}
              <Link  to={"/timeslots/" + timeslot.id}  className="btn btn-primary">View Timeslot</Link>

              <br/>
              <br/>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FetchTimeslots;
