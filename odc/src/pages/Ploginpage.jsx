import { useState } from "react";
import "./Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePatient } from "../context/PatientContext";
import { useEffect } from "react";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();               // from AuthContext
  const { setPatientId } = usePatient();     // from PatientContext
  
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
      const res = await api.post("/patients/login", {
        email: form.email,
        password: form.password
      });

      const { token, patientId } = res.data;

      // -------------------------------------
      // 1️⃣ Store in AuthContext
      // -------------------------------------
      login(token, "patient", { patientId });

      // -------------------------------------
      // 2️⃣ Store in PatientContext (your old flow)
      // -------------------------------------
      setPatientId(patientId);

      // -------------------------------------
      // 3️⃣ Persist for reload
      // -------------------------------------
      localStorage.setItem("patientId", patientId);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
    
  };
const { token } = useAuth();
// useEffect(() => {
//   if (!token) {
//     setForm({ email: "", password: "" });
//   }
// }, [token]);

 return (
  <div className="auth-container relative">

    {/* BACK BUTTON */}
    <button
  className="absolute top-6 left-6 text-teal-600 hover:text-teal-500 transition-all"
  onClick={() => navigate("/")}
>
  ← Back
</button>

    <div className="auth-card">
      <h2>Patient Login</h2>

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
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  </div>
);
}