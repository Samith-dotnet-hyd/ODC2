import "./AppointmentCard.css";
import { useNavigate } from "react-router-dom";

export default function AppointmentCard({ appointment }) {
  const navigate = useNavigate();

  // Format date & time
  const date = new Date(appointment.appointmentDateTime);
  const formattedDate = date.toLocaleDateString("en-GB");   // dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleViewDetails = () => {
    navigate(`/dashboard/appointment/${appointment.appointmentId}`);
  };

  return (
    <div className="appointment-card-new">
      <div className="left-section">

        {/* Static placeholder image */}
        <img 
          // src="https://via.placeholder.com/80" 
          src="https://ui-avatars.com/api/?name=Doctor&background=random"
          alt="doctor" 
          className="doctor-photo"
        />

        <div className="info">
          <p className="label">{appointment.status}</p>

          <h2 className="doctor-name">Appointment Id {appointment.appointmentId}</h2>

          <p className="specialization">
            Notes: {appointment.notes || "No additional notes"}
          </p>

          <div className="time-box">
            <span>{formattedTime} • {formattedDate}</span>
          </div>
        </div>
      </div>

      <button 
        className="join-btn"
        onClick={handleViewDetails}
      >
        View Details
      </button>
    </div>
  );
}
