import "./DoctorCard.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/book/${doctor.doctorId}`);
  };

  return (
    <div className="doctor-card">
      <img src={doctor.image} alt="doc" />

      <h3>{doctor.firstName}</h3>
      <p>{doctor.specialization}</p>

      <div className="price-rating">
        <p>₹ {doctor.consultationFee }</p>
        <span>⭐ {doctor.rating}</span>
      </div>

      <button onClick={handleClick}>Book Appointment</button>
    </div>
  );
}
