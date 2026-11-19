import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Constraints";

function CreateNewAppointment({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASEURL}/api/doctors/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(({ data }) => {
        setDoctors(Array.isArray(data) ? data : data.results ?? []);
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load doctors.");
      });
  }, [token]);

  useEffect(() => {
    if (!token || !doctor || !date) {
      setSlots([]);
      setTimeSlot("");
      return;
    }

    setTimeSlot("");
    console.log("Loading slots with:", doctor, date);
    axios
      .get(`${BASEURL}/api/timeslots/`, {
        params: { doctor, date },
        headers: { Authorization: `Token ${token}` },
      })
      .then(({ data }) => {
        setSlots(Array.isArray(data) ? data : data.results ?? []);
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setSlots([]);
        setError("Could not load available times.");
      });
  }, [token, doctor, date]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Please log in to book an appointment.");
      return;
    }

    if (!timeSlot) {
      setError("Please choose an available time.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        `${BASEURL}/api/appointments/create/`,
        { time_slot: timeSlot, reason },
        { headers: { Authorization: `Token ${token}` } }
      );

      navigate("/appointments");
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Could not create this appointment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) return <p>Please log in to book an appointment.</p>;

  return (
    <div>
      <h1>Book an appointment</h1>
      {error && <p role="alert">{error}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="doctor">Doctor</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(event) => setDoctor(event.target.value)}
            required
          >
            <option value="">Choose a doctor</option>
            {doctors.map((item) => (
              <option key={item.user_id} value={item.user_id}>
                {item.first_name} {item.last_name}
              </option>
            ))}
          </select>
        </div>

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
          <label htmlFor="timeSlot">Available time</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(event) => setTimeSlot(event.target.value)}
            disabled={!doctor || !date || slots.length === 0}
            required
          >
            <option value="">Choose an available time</option>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.time}
              </option>
            ))}
          </select>
          {doctor && date && slots.length === 0 && (
            <p>No available times for this doctor on this date.</p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || !timeSlot}
        >
          {submitting ? "Booking..." : "Book appointment"}
        </button>
      </form>
    </div>
  );
}

export default CreateNewAppointment;
