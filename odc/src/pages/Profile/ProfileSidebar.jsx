import "./ProfileSidebar.css";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
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

      <button className="logout-btn">Sign Out</button>
    </div>
  );
}
