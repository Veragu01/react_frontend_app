import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import FetchAppointmentDetail from "../pages/AppointmentDetail";

function FetchAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

function fetchAppointments() {
  const token = localStorage.getItem("token");
  console.log("Token exists:", Boolean(token)); // Don't log the token itself.

  axios
    .get("http://127.0.0.1:8000/api/appointments/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => setAppointments(response.data))
    .catch((error) => {
      console.error(error.response?.status, error.response?.data);
      setError("Could not load appointments.");
    });
}

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments</h1>

      {error && <p>{error}</p>}

      <ul>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            {appointment.date} - Patient: {appointment.patient_first_name} {appointment.patient_last_name}
              {/*{"    "}Doctor: {appointment.doctor_first_name} {appointment.doctor_last_name}*/}
              {"    "}Reason: {appointment.reason} {"\r\n"}
              <Link  to={"/appointments/" + appointment.id}  className="btn btn-primary">View appointment</Link>

              <br/>
              <br/>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FetchAppointments;
