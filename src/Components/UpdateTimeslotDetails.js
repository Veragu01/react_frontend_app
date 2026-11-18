import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../Constraints";

function UpdateTimeslotDetails({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [timeslot, setTimeslot] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [available, setIsAvailable] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Please log in to update this timeslot.");
      return;
    }
    console.log("Timeslot URL:", `${BASEURL}/api/timeslots/${id}/`);
    axios
      .get(`${BASEURL}/api/timeslots/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(({ data }) => {
        setTimeslot(data);
        setDate(data.date || "");
        setTime(data.time ? data.time.slice(0, 5) : "");

      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this timeslot.");
      });
  }, [id, token]);

  useEffect(() => {
    if (!token || !date || !timeslot) return;


  }, [date, timeslot, token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await axios.patch(
        `${BASEURL}/api/timeslots/${id}/`,
        { date, time},
        { headers: { Authorization: `Token ${token}` } }
      );
      navigate(`/timeslots/${id}`);
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError("Could not update this timeslot.");
    }
  }

  if (error && !timeslot) return <p>{error}</p>;
  if (!timeslot) return <p>Loading timeslot...</p>;

  return (
    <div>
      <h1>Update Timeslot</h1>
      {error && <p>{error}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="time">Available time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </div>

          <p>
            Doctor: {timeslot.doctor_first_name} {timeslot.doctor_last_name}
          </p>

          <p>Is Available: {timeslot.is_available ? "Yes" : "No"}</p>
          <button type="submit" className="btn btn-primary">Save changes</button>
        </form>

    </div>
  );
}

export default UpdateTimeslotDetails;
