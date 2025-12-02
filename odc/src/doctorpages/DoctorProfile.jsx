import React from "react";
import DashboardHeader from "../doctorcomponents/DashboardHeader";
import DoctorProfileCard from "../doctorcomponents/DoctorProfileCard";
import { useAuth } from "../context/AuthContext";
import { useDoctor } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const { logout } = useAuth();
  const { setDoctorId, setDoctor } = useDoctor();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    // Clear doctor context
    setDoctorId(null);
    setDoctor(null);

    // Clear localStorage
    localStorage.removeItem("doctorId");

    // Clear AuthContext
    logout();

    // Redirect
    navigate("/doctorlogin");
  };

  return (
    <>
      <DashboardHeader />
      <div style={{ padding: "20px" }}>
        <DoctorProfileCard />

        {/* LOGOUT BUTTON */}
        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}
