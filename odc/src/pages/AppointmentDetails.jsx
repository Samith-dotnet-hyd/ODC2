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
  const handleStartCall = async () => {
  try {
    const res = await axios.post("https://localhost:7128/api/Video/create-session", {
      appointmentId: appointment.appointmentId,
      doctorId: Number(appointment.doctorId),
      patientId: appointment.patientId,
      scheduledStart: new Date().toISOString(),
      jitsiBaseUrl: "https://meet.jit.si"
    });

    console.log("Video Session Created:", res.data);

    // navigate with created session data
    navigate("/patientvideopage", {
      state: {
        appointmentId: appointment.appointmentId,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,

        // session data you got from backend
        sessionId: res.data.sessionId,
        roomName: res.data.roomName,
        displayName: appointment.patientName
      }
    });

  } catch (err) {
    console.error("Create session error:", err);
    alert("Failed to start video session");
  }
};

const handleCancel = async () => {
  const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
  if (!confirmCancel) return;

  try {
    // Hit Ocelot gateway → appointment service
    await api.put(`/appointments/update/${appointment.appointmentId}`, {
      status: "Cancelled",
      notes: appointment.notes || "Cancelled by patient"
    });

    alert("Appointment cancelled successfully!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Cancel error:", err);
    alert("Failed to cancel appointment");
  }
};


  // Load appointment from context OR API
  useEffect(() => {
  const id = Number(appointmentId);

  // 1️⃣ Check already loaded appointments in context
  if (patientData?.appointments?.length > 0) {
    const found = patientData.appointments.find(a => a.appointmentId === id);
    if (found) {
      setAppointment(found);
      return;
    }
  }

  // 2️⃣ Otherwise fetch fresh from backend
  const fetchAppts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5004/api/Appointment/patient/${patientId}?page=1&pageSize=20`
      );

      const data = await res.json();

      // BACKEND NOW RETURNS { past: [...], future: [...] }
      const merged = [
        ...(data.past || []),
        ...(data.future || [])
      ];

      // Save merged list in global patient context
      setPatientData(prev => ({
        ...prev,
        appointments: merged
      }));

      const found = merged.find(a => a.appointmentId === id);
      setAppointment(found || null);

    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  fetchAppts();
}, [appointmentId, patientId]);

  // Fetch doctor details
  useEffect(() => {
    if (appointment?.doctorId) {
      api
        .get(`/doctors/${appointment.doctorId}`)
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

          <button onClick={handleStartCall} className="appt-btn-call">📞 Call Now</button>
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
  <button className="appt-btn-cancel" onClick={handleCancel}>
    Cancel Appointment
  </button>
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
