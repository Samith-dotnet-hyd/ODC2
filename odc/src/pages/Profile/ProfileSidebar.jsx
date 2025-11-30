import "./ProfileSidebar.css";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { setPatientId, setPatientData } = usePatient();

 const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to sign out?");

  if (!confirmLogout) return;

  // Clear context
  setPatientId(null);
  setPatientData(null);

  // Clear localStorage
  localStorage.removeItem("patientId");

  // Redirect to landing page
  navigate("/patient");
};


  return (
    <div className="profile-sidebar">
        
      {/* </div> */}
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
{/* <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button> */}
      <button className="logout-btn" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}
