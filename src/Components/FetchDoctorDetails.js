import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../Constraints";
import { Link, useNavigate, useParams } from "react-router-dom";

function FetchDoctorDetails({ token: propToken }) {
  const [appointments, setAppointments] = useState([]);
  const token = propToken || localStorage.getItem("token");
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
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
      .then((response) => setDoctor(response.data))
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this doctor.");
      });

    axios
      .get(`${BASEURL}/api/appointments/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) =>
        setAppointments(
          response.data.filter(
            (appointment) => appointment.doctor === Number(id)
          )
        )
      )
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load appointments.");
      });
  }, [id, token]);

  console.log("Detail token exists:", Boolean(token));
  if (!token) return <p>Please log in to view this doctor's details.</p>;
  if (error) return <p>{error}</p>;
  if (!doctor) return <p>Loading details...</p>;

  async function deleteDoctor() {
    if (!window.confirm("Are you sure you want to delete this Doctor?")) return;

    try {
      await axios.delete(`${BASEURL}/api/admin/users/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/doctors");
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError("Could not delete this doctor.");
    }
  }

  return (
    <div>
      <h1>Doctor Details</h1>

      {error && <p>{error}</p>}

      <p>
        Name: {doctor.first_name} {doctor.last_name}
      </p>
      <p>Username: {doctor.username}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
      <p>Address: {doctor.address}</p>

      <p>Upcoming Appointments:</p>
      <ul>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            {appointment.date} {appointment.time_slot_time} - Patient:{" "}
            {appointment.patient_first_name} {appointment.patient_last_name} - Reason: {appointment.reason}
            <br />
            <br />
          </div>
        ))}
      </ul>

      <Link to={`/doctors/${doctor.id}/update`} className="btn btn-primary">Update Doctor Details</Link>
      <button onClick={deleteDoctor} className="ms-3 btn btn-danger">Delete Doctor</button>
    </div>
  );
}

export default FetchDoctorDetails;
