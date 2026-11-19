import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../Constraints";

function UpdateDoctor({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASEURL}/api/admin/users/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        const { username, first_name, last_name, email, phone, address } =
          response.data;
        setForm({ username, first_name, last_name, email, phone, address });
      })
      .catch((error) => {
        console.error(error.response?.status, error.response?.data);
        setError("Could not load this doctor.");
      });
  }, [id, token]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.patch(`${BASEURL}/api/admin/users/${id}/`, form, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate(`/doctors/${id}`);
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Could not update this doctor."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) return <p>Please log in to update a doctor.</p>;

  return (
    <div>
      <h1>Update doctor</h1>
      {error && <p role="alert">{error}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="first_name">First name</label>
          <input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="last_name">Last name</label>
          <input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="address">Address</label>
          <input id="address" name="address" value={form.address} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? "Updating..." : "Update doctor"}</button>
      </form>
    </div>
  );
}

export default UpdateDoctor;
