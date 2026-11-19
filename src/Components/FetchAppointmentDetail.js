import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASEURL} from "../Constraints";
import {Link, useNavigate, useParams} from "react-router-dom";
// import AppointmentDetail from "../pages/AppointmentDetail";



function FetchAppointmentDetail({ token: propToken }) {
    const token = propToken || localStorage.getItem("token")
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASEURL}/api/appointments/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setAppointment(response.data))
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this appointment.");
      });
  }, [id, token]);

    // console.log("App token exists:", Boolean(Token));
    console.log("Detail token exists:", Boolean(token));
    if (!token) return <p>Please log in to view this appointment.</p>;
    if (error) return <p>{error}</p>;
    if (!appointment) return <p>Loading appointment...</p>;

    async function deleteAppointment() {
      if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

      try {
        await axios.delete(`${BASEURL}/api/appointments/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        navigate("/appointments");
      } catch (error) {
        console.error(error.response?.status, error.response?.data);
        setError("Could not cancel this appointment.");
      }
    }

  return (
    <div>
      <h1>Appointment Details</h1>

      {error && <p>{error}</p>}

      <p>Date: {appointment.date}</p>
      <p>
        Patient: {appointment.patient_first_name}{" "}
        {appointment.patient_last_name}
      </p>
      <p>
        Doctor: {appointment.doctor_first_name}{" "}
        {appointment.doctor_last_name}
      </p>
      <p>Time slot: {appointment.time_slot_time}</p>
      <p>Reason: {appointment.reason}</p>
      <Link to={`/appointments/${appointment.id}/update`} className="btn btn-primary">Update</Link>
      <button onClick={deleteAppointment} className={"ms-3 btn btn-danger"}>Cancel appointment</button>
    </div>
  );
}

export default FetchAppointmentDetail;
