import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Constraints";

function CreateNewTimeslot({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Please log in to create a timeslot.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        `${BASEURL}/api/timeslots/create/`,
        { date, time },
        { headers: { Authorization: `Token ${token}` } }
      );

      navigate("/timeslots");
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError(error.response?.data ? JSON.stringify(error.response.data) : "Could not create this timeslot.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) return <p>Please log in to create a timeslot.</p>;

  return (
    <div>
      <h1>Create Timeslot</h1>
      {error && <p role="alert">{error}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
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

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Creating..." : "Create timeslot"}
        </button>
      </form>
    </div>
  );
}

export default CreateNewTimeslot;
