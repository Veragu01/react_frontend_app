import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BASEURL} from "../Constraints";

function FetchPatients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");

  function fetchPatients() {
    const savedToken = localStorage.getItem("token");
    const savedUserType = localStorage.getItem("user_type");

    setToken(savedToken);
    setUserType(savedUserType);

    if (!savedToken || savedUserType !== "administrator") {
      setError("Only administrators can manage patients.");
      return;
    }

    axios
      .get(`${BASEURL}/api/admin/users/`, {
        headers: {
          Authorization: `Token ${savedToken}`,
        },
      })
      .then((response) => {
        console.log("Patients pre filter" + response.data)
        setPatients(response.data.filter((user) => user.role === "patient"));
        // console.log("user.role = " + response.data.user.role)
        console.log("Patients post filter" + patients)
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load patients.");
      });
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  if (userType !== "administrator") {
    return <p>Only administrators can manage patients.</p>;
  }

  return (
    <div>
      <h1>Patients</h1>

      {error && <p>{error}</p>}

      {userType === "administrator" && (
        <Link to="/patients/create" className="mb-3 ms-3 btn btn-primary">Create New Patient</Link>
      )}

      <ul>
        {patients.map((patient) => (
          <div key={patient.id}>
            {patient.first_name} {patient.last_name}
            {"    "}
            <Link to={"/patients/" + patient.id} className="btn btn-primary">View patient</Link>
            <br />
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FetchPatients;
