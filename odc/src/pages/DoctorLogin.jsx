import { useState } from "react";
import "./Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDoctor } from "../context/DoctorContext";

export default function DoctorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();             
  const { setDoctorId, setDoctor } = useDoctor();   

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      // LOGIN REQUEST
      const res = await api.post("/doctors/login", {
        email: form.email,
        password: form.password
      });

      const { token, doctorId } = res.data;

      // Save token + role in AuthContext
      login(token, "doctor", { doctorId });

      // Save doctorId in DoctorContext
      setDoctorId(doctorId);
      localStorage.setItem("doctorId", doctorId);

      // 🔥 Fetch doctor full profile immediately
      const profile = await api.get(`/doctors/${doctorId}`);
      setDoctor(profile.data);  // store full doctor info

      // Redirect after profile is set
      navigate("/doctordashboard");

    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
       <button
  className="absolute top-6 left-6 text-teal-600 hover:text-teal-500 transition-all"
  onClick={() => navigate("/")}
>
  ← Back
</button>

      <div className="auth-card">
     

        <h2>Doctor Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-switch">
          Are you a patient?{" "}
          <span onClick={() => navigate("/login")}>Patient Login</span>
        </p>
      </div>
    </div>
  );
}
