import { useState, useEffect } from "react";
import "./Profile.css";
import Sidebar from "./ProfileSidebar";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import axios from "axios";
import Navbar from "../../components/Navbar";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("details");
  const [userData, setUserData] = useState(null);
  const userId = "7"; // <- replace with real logged-in user ID

  useEffect(() => {
    if (activeTab === "details") {
      fetchProfile();
    }
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5138/api/Patients/${userId}`);


      setUserData(res.data); // profile exists

    } catch (err) {
      if (err.response && err.response.status === 404) {
        setUserData(null); // no profile → show create form
      }
    }
  };

  return (
    <>
    <Navbar/>
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
    </>
  );
}
