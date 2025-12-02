import "./ProfileSidebar.css";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";
import { useAuth } from "../../context/AuthContext";
export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { setPatientId, setPatientData } = usePatient();

const { logout } = useAuth();      // from AuthContext

const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to sign out?");

  if (!confirmLogout) return;

  // 🔹 Clear PatientContext
  setPatientId(null);
  setPatientData(null);

  // 🔹 Call AuthContext logout (clears token, role, user)
  logout();

  // 🔹 Remove old patientId stored earlier
  localStorage.removeItem("patientId");
  

  // 🔹 Redirect to patient landing page
  navigate("/login", { replace: true });

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
