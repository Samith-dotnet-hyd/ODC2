import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../context/PatientContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { patientData } = usePatient();

  const profileImg = patientData?.image
    ? `http://localhost:5138/${patientData.image}`
    : "https://via.placeholder.com/150";

  return (
    <div className="navbar">
      {/* LEFT SIDE */}
      <div className="navbar-left">
        <h2 style={{ margin: 0 }}>HealthCare</h2>

        <span 
          className="navbar-link"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>
      </div>

      {/* RIGHT SIDE */}
      <img
        src={profileImg}
        alt="profile"
        className="navbar-profile"
        onClick={() => navigate("/dashboard/profile")}
      />
    </div>
  );
}
