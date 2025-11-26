import "./IconCard.css";
import { useNavigate } from "react-router-dom";

export default function IconCard({ title, icon, link }) {
  const navigate = useNavigate();

  return (
    <div 
      className="icon-card"
      onClick={() => link && navigate(link)}
    >
      <div className="icon">{icon}</div>
      <p>{title}</p>
    </div>
  );
}
