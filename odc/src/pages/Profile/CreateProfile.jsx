import { useState } from "react";
import axios from "axios";
import "./CreateProfile.css";

export default function CreateProfile() {
  const [form, setForm] = useState({
  UserId: "",
  FirstName: "",
  LastName: "",
  Phone: "",
  Email: "",
  PassHash: "",
  DateOfBirth: "",
  MedicalHistory: "",
  Allergies: "",
  BloodGroup: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:7243/api/Patients", form);
      alert("Profile Created Successfully!");
    } catch (err) {
      alert("Error creating profile");
      console.error(err);
    }
  };

  return (
    <div className="create-profile">
      <h1>Create Patient Profile</h1>

      <form onSubmit={handleSubmit}>
        <input type="name" name="userId" placeholder="User ID" onChange={handleChange} />

        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />

        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />

        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" onChange={handleChange} />

        <textarea name="medicalHistory" placeholder="Medical History" onChange={handleChange} />

        <textarea name="allergies" placeholder="Allergies" onChange={handleChange} />

        <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />

        {/* <input name="insuranceProvider" placeholder="Insurance Provider" onChange={handleChange} />

        <input name="insuranceNumber" placeholder="Insurance Number" onChange={handleChange} /> */}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
