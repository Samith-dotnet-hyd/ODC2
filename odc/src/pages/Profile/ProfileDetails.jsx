import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileDetails.css";

export default function ProfileDetails({ userData, userId, fetchProfile }) {

  // Create profile fields (full DTO)
  const emptyForm = {
    UserId: userId,
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    PassHash: "",
    DateOfBirth: "",
    MedicalHistory: "",
    Allergies: "",
    BloodGroup: ""
  };

  const [form, setForm] = useState(emptyForm);

  // Load profile data
  useEffect(() => {
    if (!userData) {
      setForm(emptyForm);
      return;
    }

    setForm({
      ...userData,
      DateOfBirth: userData.dateOfBirth
        ? userData.dateOfBirth.split("T")[0]
        : ""
    });
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------ CREATE ------------------------
  const handleCreate = async () => {
    try {
      await axios.post("https://localhost:7243/api/Patients", form);
      alert("Profile created successfully");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to create profile");
    }
  };

  // ------------------------ UPDATE ------------------------
  const handleUpdate = async () => {
    const updatePayload = {
      Phone: form.Phone,
      MedicalHistory: form.MedicalHistory,
      Allergies: form.Allergies,
      BloodGroup: form.BloodGroup,
      InsuranceProvider: form.InsuranceProvider || "",
      InsuranceNumber: form.InsuranceNumber || ""
    };

    try {
      await axios.put(`https://localhost:7243/api/Patients/${userId}`, updatePayload);
      alert("Profile updated successfully");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const isNew = userData === null;

  return (
    <div className="profile-details">

      <h2>{isNew ? "Create Profile" : "Update Profile"}</h2>

      <div className="form-grid">

        {/* CREATE FIELDS (ignore during update) */}
        <input
          name="FirstName"
          value={form.FirstName || ""}
          placeholder="First Name"
          onChange={handleChange}
          disabled={!isNew}
        />

        <input
          name="LastName"
          value={form.LastName || ""}
          placeholder="Last Name"
          onChange={handleChange}
          disabled={!isNew}
        />

        <input
          name="Email"
          value={form.Email || ""}
          placeholder="Email"
          onChange={handleChange}
          disabled={!isNew}
        />

        <input
          name="PassHash"
          value={form.PassHash || ""}
          placeholder="Password Hash"
          onChange={handleChange}
          disabled={!isNew}
        />

        <input
          type="date"
          name="DateOfBirth"
          value={form.DateOfBirth || ""}
          onChange={handleChange}
          disabled={!isNew}
        />

        {/* UPDATE + CREATE FIELDS */}
        <input
          name="Phone"
          value={form.Phone || ""}
          placeholder="Phone"
          onChange={handleChange}
        />

        <textarea
          name="MedicalHistory"
          value={form.MedicalHistory || ""}
          placeholder="Medical History"
          onChange={handleChange}
        />

        <textarea
          name="Allergies"
          value={form.Allergies || ""}
          placeholder="Allergies"
          onChange={handleChange}
        />

        <input
          name="BloodGroup"
          value={form.BloodGroup || ""}
          placeholder="Blood Group"
          onChange={handleChange}
        />

        {/* Optional Insurance fields */}
        <input
          name="InsuranceProvider"
          value={form.InsuranceProvider || ""}
          placeholder="Insurance Provider"
          onChange={handleChange}
        />

        <input
          name="InsuranceNumber"
          value={form.InsuranceNumber || ""}
          placeholder="Insurance Number"
          onChange={handleChange}
        />

      </div>

      {isNew ? (
        <button className="save-btn" onClick={handleCreate}>
          Create Profile
        </button>
      ) : (
        <button className="save-btn" onClick={handleUpdate}>
          Update Profile
        </button>
      )}
    </div>
  );
}
