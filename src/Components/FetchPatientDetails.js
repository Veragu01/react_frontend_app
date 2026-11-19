import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASEURL} from "../Constraints";
import {Link, useNavigate, useParams} from "react-router-dom";


function FetchPatientDetails({ token: propToken }) {
  const [appointments, setAppointments] = useState([]);
  const token = propToken || localStorage.getItem("token")
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASEURL}/api/admin/users/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) =>
          setPatient(response.data))
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this patient.");
      });

    axios
      .get(`${BASEURL}/api/appointments/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setAppointments(response.data.filter((appointment) => appointment.patient === Number(id) )))
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load appointments.");
      });

  }, [id, token]);



    console.log("Detail token exists:", Boolean(token));
    if (!token) return <p>Please log in to view this patients details.</p>;
    if (error) return <p>{error}</p>;
    if (!patient) return <p>Loading details...</p>;

    async function deletePatient() {
      if (!window.confirm("Are you sure you want to delete this Patient?")) return;

      try {
        await axios.delete(`${BASEURL}/api/admin/users/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        navigate("/patient");
      } catch (error) {
        console.error(error.response?.status, error.response?.data);
        setError("Could not cancel this patient.");
      }
    }

  return (
    <div>
      <h1>Patient Details</h1>

      {error && <p>{error}</p>}

      <p>Name: {patient.first_name} {patient.last_name}</p>
      <p>
        Username: {patient.username}
      </p>
      <p>
        Email: {patient.email}
      </p>
      <p>Phone: {patient.phone}</p>
      <p>Address: {patient.address}</p>
      <p>Upcoming Appointments:</p>
      <ul>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            {appointment.date} {appointment.time_slot_time} - Doctor: {appointment.doctor_first_name} {appointment.doctor_last_name} - Reason: {appointment.reason} {"\r\n"}
              <br/>
              <br/>
          </div>
        ))}
      </ul>
      <Link to={`/patients/${patient.id}/update`} className="btn btn-primary">Update Patient Details</Link>
      <button onClick={deletePatient} className={"ms-3 btn btn-danger"}>Delete Patient</button>
    </div>
  );
}

export default FetchPatientDetails;
