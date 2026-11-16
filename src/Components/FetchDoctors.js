import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  function fetchDoctors() {
    axios
      .get("http://127.0.0.1:8000/api/doctors/")
      .then((response) => setDoctors(response.data))
      .catch((error) => {
        console.error(error);
        setError("Could not load doctors.");
      });
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>Doctors</h1>

      {error && <p>{error}</p>}

      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.first_name} {doctor.last_name}
            {doctor.phone && ` - ${doctor.phone}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchDoctors;
