import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  function fetchDoctors() {
    axios
      .get("http://127.0.0.1:8000/api/doctors/")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Could not fetch doctors:", error));
  }

  return (
    <div>
      <h1>Doctors</h1>
      <button onClick={fetchDoctors}>Fetch Doctors</button>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.first_name} {doctor.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchDoctors;