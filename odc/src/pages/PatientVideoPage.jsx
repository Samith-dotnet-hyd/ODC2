// src/pages/PatientVideoPage.jsx
import React, { useEffect, useState } from "react";
import { videoApi } from "../services/videoApi";
import { doctorApi } from "../services/doctorApi";
import { patientApi } from "../services/patientApi";
import VideoSession from "../components/VideoSession";
import { useLocation } from "react-router-dom";
export default function PatientVideoPage() {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
const { state } = useLocation();
  const appointmentId = state?.appointmentId;
  const patientId = state?.patientId;
  const doctorId = state?.doctorId; 
  // load patient
  useEffect(() => {
    async function loadPatient() {
      const p = await patientApi.getPatientById(patientId);
      setPatient(p.data);
    }
    loadPatient();
  }, [patientId]);

  // load session + doctor
  useEffect(() => {
    async function loadVideoSession() {
      const res = await videoApi.getByAppointment(appointmentId);
      setSession(res.data);
     

      const d = await doctorApi.getDoctorById(res.data.doctorId);
      setDoctor(d.data);

      setLoading(false);
    }
    loadVideoSession();
  }, [appointmentId]);

  if (loading || !patient || !doctor || !session)
    return <h2>Loading session...</h2>;

  return (
    <>
    <VideoSession
      sessionId={session.id}
      roomName={session.roomName}
      userId={patientId}
      displayName={`${patient.firstName} ${patient.lastName}`}

      appointmentId={appointmentId}
      doctorId={doctor.doctorId}
      patientId={patientId}

      doctorName={doctor.firstName}
      patientName={patient.firstName}

      scheduledStart={session.scheduledStart}
      sessionStatus={session.status}
    />
   
    </>
  );
}
