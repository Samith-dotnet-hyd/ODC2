import { useParams, useNavigate } from "react-router-dom";
import { usePatient } from "../context/PatientContext";
import { useEffect, useState } from "react";
import api from "../api";
import "./AppointmentDetails.css";

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const { patientId, patientData, setPatientData } = usePatient();

  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);

  // Load appointment from context OR API
  useEffect(() => {
    const id = Number(appointmentId);

    // Check in context first
    if (patientData?.appointments?.length > 0) {
      const found = patientData.appointments.find(a => a.appointmentId === id);
      if (found) {
        setAppointment(found);
        return;
      }
    }

    // Otherwise fetch from API
    const fetchAppts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5004/api/Appointement/patient/${patientId}?page=1&pageSize=20`
        );
        const data = await res.json();

        const list = data.past || [];

        setPatientData(prev => ({ ...prev, appointments: list }));

        const found = list.find(a => a.appointmentId === id);
        setAppointment(found || null);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchAppts();
  }, [appointmentId, patientId]);

  // Fetch doctor details
  useEffect(() => {
    if (appointment?.doctorId) {
      api
        .get(`/doctor/${appointment.doctorId}`)
        .then(res => setDoctor(res.data))
        .catch(err => console.error(err));
    }
  }, [appointment]);

  if (!appointment) return <h2>Appointment not found</h2>;

  const dateObj = new Date(appointment.appointmentDateTime);
  const date = dateObj.toLocaleDateString("en-GB");
  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const statusClass =
    appointment.status === "Scheduled"
      ? "appt-status scheduled"
      : appointment.status === "Completed"
      ? "appt-status completed"
      : "appt-status cancelled";

  return (
    <div className="appt-container">
      <h1 className="appt-title">Consultation Details</h1>

      <div className="appt-grid">

        {/* LEFT — Doctor Card */}
        <div className="appt-doctor-card">
          <img
            src={
              doctor?.image?.startsWith("http")
                ? doctor.image
                : "https://via.placeholder.com/120"
            }
            className="appt-doctor-photo"
            alt="Doctor"
          />

          <h2 className="appt-doctor-name">
            Dr. {doctor?.firstName} {doctor?.lastName}
          </h2>
          <p className="appt-spec">{doctor?.specialization}</p>

          <div className="appt-doc-info">
            <p>Experience: <b>{doctor?.experiences} years</b></p>
            <p>Rating: ⭐ <b>{doctor?.rating}</b></p>
            <p>Hospital: <b>{doctor?.hospitalName}</b></p>
            <p>Fee: <b>₹{doctor?.consultationFee}</b></p>
          </div>

          <button className="appt-btn-call">📞 Call Now</button>
          <button className="appt-btn-msg">💬 Message</button>
        </div>

        {/* RIGHT — Appointment Card */}
        <div className="appt-details-card">
          <span className={statusClass}>{appointment.status}</span>

          <h3>Appointment Information</h3>

          <p><b>Date:</b> {date}</p>
          <p><b>Time:</b> {time}</p>
          <p><b>Notes:</b> {appointment.notes}</p>
          <p><b>Appointment ID:</b> #{appointment.appointmentId}</p>

          {appointment.status === "Scheduled" && (
            <button className="appt-btn-cancel">Cancel Appointment</button>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="appt-bottom-actions">
        <button className="appt-btn-back" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <button className="appt-btn-book" onClick={() => navigate("/dashboard/doctors")}>
          Book Another Appointment
        </button>
      </div>
    </div>
  );
}
