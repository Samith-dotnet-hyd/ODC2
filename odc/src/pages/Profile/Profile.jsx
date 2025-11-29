import { useState } from "react";
import "./Profile.css";
import Sidebar from "./ProfileSidebar";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import Navbar from "../../components/Navbar";

import { usePatient } from "../../context/PatientContext";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("details");

  // Get everything from context
  const { patientId, patientData } = usePatient();

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="profile-content">
          
          {activeTab === "details" && (
            <ProfileDetails
              userData={patientData}   // <-- comes directly from context
              userId={patientId}       // <-- always correct
            />
          )}

          {activeTab === "settings" && <ProfileSettings />}
        </div>

      </div>
    </>
  );
}
