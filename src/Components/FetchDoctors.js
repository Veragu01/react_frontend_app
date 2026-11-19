import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASEURL } from "../Constraints";

function FetchDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");

  function fetchDoctors() {
    const savedToken = localStorage.getItem("token");
    const savedUserType = localStorage.getItem("user_type");

    setToken(savedToken);
    setUserType(savedUserType);

    if (!savedToken || savedUserType !== "administrator") {
      setError("Only administrators can manage doctors.");
      return;
    }

    axios
      .get(`${BASEURL}/api/admin/users/`, {
        headers: {
          Authorization: `Token ${savedToken}`,
        },
      })
      .then((response) => {
        setDoctors(response.data.filter((user) => user.role === "doctor"));
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load doctors.");
      });
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (userType !== "administrator") {
    return <p>Only administrators can manage doctors.</p>;
  }

  return (
    <div>
      <h1>Doctors</h1>

      {error && <p>{error}</p>}

      {userType === "administrator" && (
        <Link to="/doctors/create" className="mb-3 ms-3 btn btn-primary">
          Create New Doctor
        </Link>
      )}

      <ul>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            {doctor.first_name} {doctor.last_name}
            {"    "}
            <Link to={"/doctors/" + doctor.id} className="btn btn-primary">
              View doctor
            </Link>
            <br />
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FetchDoctors;
