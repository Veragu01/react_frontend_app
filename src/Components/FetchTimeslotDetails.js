import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASEURL} from "../Constraints";
import {Link, useNavigate, useParams} from "react-router-dom";



function FetchTimeslotDetail({ token: propToken }) {
    const token = propToken || localStorage.getItem("token")
  const { id } = useParams();
  const [timeslot, setTimeslot] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASEURL}/api/timeslots/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setTimeslot(response.data))
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this timeslot.");
      });
  }, [id, token]);

    // console.log("App token exists:", Boolean(Token));
    console.log("Detail token exists:", Boolean(token));
    if (!token) return <p>Please log in to view this timeslot.</p>;
    if (error) return <p>{error}</p>;
    if (!timeslot) return <p>Loading timeslot...</p>;

    async function deleteTimeslot() {
      if (!window.confirm("Are you sure you want to remove this timeslot?")) return;

      try {
        await axios.delete(`${BASEURL}/api/timeslots/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        navigate("/timeslots");
      } catch (error) {
        console.error(error.response?.status, error.response?.data);
        setError("Could not remove this timeslot.");
      }
    }

  return (
    <div>
      <h1>Timeslot Details</h1>

      {error && <p>{error}</p>}

      <p>Date: {timeslot.date}</p>
      <p>
        Time: {timeslot.time}
      </p>
      <p>
        Doctor: {timeslot.doctor_first_name} {timeslot.doctor_last_name}
      </p>
      <p>Is Available: {timeslot.is_available ? "Yes" : "No"}</p>
      <Link to={`/timeslots/${timeslot.id}/update`} className="btn btn-primary">Update</Link>
      <button onClick={deleteTimeslot} className={"ms-3 btn btn-danger"}>Delete timeslot</button>
    </div>
  );
}

export default FetchTimeslotDetail;
