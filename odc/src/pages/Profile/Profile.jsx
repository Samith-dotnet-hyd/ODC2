import { useState, useEffect } from "react";
import "./Profile.css";
import Sidebar from "./ProfileSidebar";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import axios from "axios";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("details");
  const [userData, setUserData] = useState(null);
  const userId = "4"; // <- replace with real logged-in user ID

  useEffect(() => {
    if (activeTab === "details") {
      fetchProfile();
    }
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://localhost:7243/api/Patients/${userId}`);


      setUserData(res.data); // profile exists

    } catch (err) {
      if (err.response && err.response.status === 404) {
        setUserData(null); // no profile → show create form
      }
    }
  };

  return (
    <div className="profile-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile-content">
        {activeTab === "details" && (
          <ProfileDetails userData={userData} userId={userId} fetchProfile={fetchProfile} />
        )}

        {activeTab === "settings" && (
          <ProfileSettings />
        )}
      </div>
    </div>
  );
}
