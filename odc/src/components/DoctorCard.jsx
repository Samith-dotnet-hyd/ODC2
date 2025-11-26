import "./DoctorCard.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const { addAppointment } = useContext(AppContext);

const handleClick = () => {
  addAppointment(doctor);
  navigate("/");
};

  return (
    <div className="doctor-card">
      <img src={doctor.image} alt="doc" />

      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>

      <div className="price-rating">
        <p>₹ {doctor.fee}</p>
        <span>⭐ {doctor.rating}</span>
      </div>

      <button onClick={handleClick}>Book Appointment</button>
    </div>
  );
}
