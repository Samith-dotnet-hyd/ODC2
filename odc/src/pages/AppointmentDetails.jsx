import { useParams } from "react-router-dom";
import { usePatient } from "../context/PatientContext";
import { useEffect, useState } from "react";
import api from "../api";

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const { patientData } = usePatient();

  const [doctor, setDoctor] = useState(null);

  // 1. Get appointment from context
  const appointment = patientData?.appointments?.find(
    appt => appt.appointmentId === Number(appointmentId)
  );

  // 2. Fetch doctor details
  useEffect(() => {
    if (appointment?.doctorId) {
      api.get(`/doctors/${appointment.doctorId}`)
        .then(res => setDoctor(res.data))
        .catch(err => console.error(err));
    }
  }, [appointment]);

  if (!appointment) return <h2>Appointment not found</h2>;

  return (
    <div>
      <h2>Doctor Consultation Details</h2>

      {doctor ? (
        <>
          <h3>{doctor.firstName} {doctor.lastName}</h3>
          <p>{doctor.specialization}</p>
          <p>Experience: {doctor.experiences} years</p>
          <p>Rating: ⭐ {doctor.rating}</p>
          <p>Fee: ₹{doctor.consultationFee}</p>
        </>
      ) : (
        <p>Loading doctor details...</p>
      )}

      <h3>Appointment Info</h3>
      <p>Date: {appointment.appointmentDateTime}</p>
      <p>Status: {appointment.status}</p>
      <p>Notes: {appointment.notes}</p>
    </div>
  );
}
