import { useState, useEffect } from "react";
import "./ProfileDetails.css";
import api from "../../api";
import { usePatient } from "../../context/PatientContext";

export default function ProfileDetails({ userData, userId }) {
  const { setPatientData } = usePatient();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    medicalHistory: "",
    allergies: "",
    bloodGroup: "",
    insuranceProvider: "",
    insuranceNumber: ""
  });

  // Load context data into form
  useEffect(() => {
    if (!userData) return;

    setForm({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      dateOfBirth: userData.dateOfBirth
        ? userData.dateOfBirth.split("T")[0]
        : "",
      medicalHistory: userData.medicalHistory || "",
      allergies: userData.allergies || "",
      bloodGroup: userData.bloodGroup || "",
      insuranceProvider: userData.insuranceProvider || "",
      insuranceNumber: userData.insuranceNumber || ""
    });
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Refresh global profile after update
  const refreshProfile = async () => {
    try {
      const res = await api.get(`/patients/${userId}`);
      setPatientData(res.data); // update global context
    } catch (err) {
      console.error("Error refreshing updated profile", err);
    }
  };

  // Update profile in DB
  const handleUpdate = async () => {
    try {
      await api.put(`/patients/${userId}`, form);
      alert("Profile updated!");
      await refreshProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-details">
      <h2>My Profile</h2>

      <div className="form-grid">
        <input
          name="firstName"
          value={form.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          name="lastName"
          value={form.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone"
          onChange={handleChange}
        />

        <textarea
          name="medicalHistory"
          value={form.medicalHistory}
          placeholder="Medical History"
          onChange={handleChange}
        />

        <textarea
          name="allergies"
          value={form.allergies}
          placeholder="Allergies"
          onChange={handleChange}
        />

        <input
          name="bloodGroup"
          value={form.bloodGroup}
          placeholder="Blood Group"
          onChange={handleChange}
        />

        <input
          name="insuranceProvider"
          value={form.insuranceProvider}
          placeholder="Insurance Provider"
          onChange={handleChange}
        />

        <input
          name="insuranceNumber"
          value={form.insuranceNumber}
          placeholder="Insurance Number"
          onChange={handleChange}
        />
      </div>

      <button className="save-btn" onClick={handleUpdate}>
        Update Profile
      </button>
    </div>
  );
}
