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
    password: "",        // NEW FIELD
    dateOfBirth: "",
    medicalHistory: "",
    allergies: "",
    bloodGroup: "",
    insuranceProvider: "",
    insuranceNumber: ""
  });

  const [errors, setErrors] = useState({}); // store validation errors

  // Load data
  useEffect(() => {
    if (!userData) return;

    setForm({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      password: "", // user will update manually
      dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : "",
      medicalHistory: userData.medicalHistory || "",
      allergies: userData.allergies || "",
      bloodGroup: userData.bloodGroup || "",
      insuranceProvider: userData.insuranceProvider || "",
      insuranceNumber: userData.insuranceNumber || ""
    });
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  // VALIDATION FUNCTION
  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (form.password && form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const refreshProfile = async () => {
    try {
      const res = await api.get(`/patients/${userId}`);
      setPatientData(res.data);
    } catch (err) {
      console.error("Error refreshing updated profile", err);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return; // stop if invalid

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

        {/* FIRST NAME */}
        <div>
          <input
            name="firstName"
            className={errors.firstName ? "input-error" : ""}
            value={form.firstName}
            placeholder="First Name *"
            onChange={handleChange}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>

        {/* LAST NAME */}
        <div>
          <input
            name="lastName"
            className={errors.lastName ? "input-error" : ""}
            value={form.lastName}
            placeholder="Last Name *"
            onChange={handleChange}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            className={errors.email ? "input-error" : ""}
            value={form.email}
            placeholder="Email *"
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* DATE OF BIRTH */}
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        {/* PHONE */}
        <div>
          <input
            name="phone"
            className={errors.phone ? "input-error" : ""}
            value={form.phone}
            placeholder="Phone *"
            onChange={handleChange}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            name="password"
            className={errors.password ? "input-error" : ""}
            value={form.password}
            placeholder="New Password (optional)"
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* TEXT FIELDS */}
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
