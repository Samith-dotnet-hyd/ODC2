import { useState } from "react";
import "./Profile.css";
import Sidebar from "./ProfileSidebar";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("details");
  const { patientId, patientData } = usePatient();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="back-btn-wrapper">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
      

      <div className="profile-container">
       
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="profile-content">
          {activeTab === "details" && (
            <ProfileDetails
              userData={patientData}
              userId={patientId}
            />
          )}

          {activeTab === "settings" && <ProfileSettings />}
        </div>

      </div>
    </>
  );
}
