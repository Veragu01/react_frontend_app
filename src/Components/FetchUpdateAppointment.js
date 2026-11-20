import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../Constraints";

function FetchUpdateAppointment({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Please log in to update this appointment.");
      return;
    }
    console.log("Appointment URL:", `${BASEURL}/api/appointments/${id}/`);
    axios
      .get(`${BASEURL}/api/appointments/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(({ data }) => {
        setAppointment(data);
        setDate(data.date);
        setTimeSlot(String(data.time_slot));
        setReason(data.reason || "");
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this appointment.");
      });
  }, [id, token]);

  useEffect(() => {
    if (!token || !date || !appointment) return;

    axios
      .get(`${BASEURL}/api/timeslots/`, {
        params: { date, doctor: appointment.doctor },
        headers: { Authorization: `Token ${token}` },
      })
      .then(({ data }) => {
          setSlots(Array.isArray(data) ? data : data.results ?? []);
      })

      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load available times.");
      });
  }, [date, appointment, token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = { date, reason };

      if (!timeSlotUnchanged) {
        if (!timeSlot) {
          setError("Choose an available time for the new date.");
          return;
        }
        data.time_slot = timeSlot;
      }
      await axios.patch(
        `${BASEURL}/api/appointments/${id}/`,
        data,
        { headers: { Authorization: `Token ${token}` } }
      );
      navigate(`/appointments/${id}`);
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError("Could not update this appointment.");
    }
  }

  if (error && !appointment) return <p>{error}</p>;
  if (!appointment) return <p>Loading appointment...</p>;

  const dateUnchanged = date === appointment.date;
  const timeSlotUnchanged = String(timeSlot) === String(appointment.time_slot);
  const currentSlotMissing = dateUnchanged && timeSlot && !slots.some((slot) => String(slot.id) === String(timeSlot));

  return (
    <div>
      <h1>Update appointment</h1>
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
        setTimeSlot("");
      }}
      required
    />
  </div>

  <div className="form-row">
    <label htmlFor="timeSlot">Available time</label>
    <select
      id="timeSlot"
      value={timeSlot}
      onChange={(event) => setTimeSlot(event.target.value)}
      required={!dateUnchanged}
    >
      <option value="">Choose a time</option>

      {currentSlotMissing && (
        <option value={String(appointment.time_slot)}> {appointment.time_slot_time}</option>
      )}

      {slots.map((slot) => (
        <option key={slot.id} value={String(slot.id)}>
          {slot.time}
        </option>
      ))}
    </select>
    {/*<select id="timeSlot" value={timeSlot}*/}
    {/*        onChange={(event) => setTimeSlot(event.target.value)} required >*/}
    {/*  <option value="">Choose a time</option>*/}
    {/*  {slots.map((slot) => (*/}
    {/*    <option key={slot.id} value={String(slot.id)}>*/}
    {/*      {slot.time}*/}
    {/*    </option>*/}
    {/*  ))}*/}
    {/*  /!*<option value="09:00">9:00 AM</option>*!/*/}
    {/*  /!*<option value="02:00">2:00 PM</option>*!/*/}
    {/*</select>*/}
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

  <div className="form-row">
    <span aria-hidden="true" />
    <button type="submit" className="btn btn-primary">Save changes</button>
  </div>
</form>

    </div>
  );
}

export default FetchUpdateAppointment;
