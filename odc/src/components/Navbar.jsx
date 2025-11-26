import "./Navbar.css";
import { AppContext } from "../context/AppContext";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>HealthCare</h2>

      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="profile"
        className="navbar-profile"
        onClick={() => navigate("/profile")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
