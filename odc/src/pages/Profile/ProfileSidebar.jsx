import "./ProfileSidebar.css";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { setPatientId, setPatientData } = usePatient();

  const handleLogout = () => {
    // Clear context
    setPatientId(null);
    setPatientData(null);

    // Clear localStorage (if persistence is used)
    localStorage.removeItem("patientId");

    // Redirect to landing page
    navigate("/patient");
  };

  return (
    <div className="profile-sidebar">
      <button
        className={activeTab === "details" ? "active" : ""}
        onClick={() => setActiveTab("details")}
      >
        Profile Details
      </button>

      <button
        className={activeTab === "settings" ? "active" : ""}
        onClick={() => setActiveTab("settings")}
      >
        Settings
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}
