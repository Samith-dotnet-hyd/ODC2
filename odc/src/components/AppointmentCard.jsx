import "./AppointmentCard.css";

export default function AppointmentCard({ doctor }) {
  return (
    <div className="appointment-card-new">
      <div className="left-section">
        <img src={doctor.image} alt="doctor" className="doctor-photo" />

        <div className="info">
          <p className="label">Upcoming Consultation</p>

          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="specialization">{doctor.specialization}</p>

          <div className="time-box">
            <span>10:00 AM • Today</span>
          </div>
        </div>
      </div>

      <button className="join-btn">Join Video Call</button>
    </div>
  );
}
