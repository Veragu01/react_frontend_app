import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Constraints";

function CreateNewDoctor({ token: propToken }) {
  const token = propToken || localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Please log in to create a doctor.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        `${BASEURL}/api/admin/users/`,
        { ...form, role: "doctor" },
        { headers: { Authorization: `Token ${token}` } }
      );

      navigate("/doctors");
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Could not create this doctor."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) return <p>Please log in to create a doctor.</p>;

  return (
    <div>
      <h1>Create a new doctor</h1>
      {error && <p role="alert">{error}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="e.g. john.smith"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="first_name">First name</label>
          <input
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="last_name">Last name</label>
          <input
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. johnsmith@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Begin with +64 or 0"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            placeholder="e.g. 123 Queen Street, Auckland CBD, Auckland"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? "Creating..." : "Create doctor"}</button>
      </form>
    </div>
  );
}

export default CreateNewDoctor;
