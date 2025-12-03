// src/pages/DoctorVideoPage.jsx
import React, { useEffect, useState } from "react";
import { videoApi } from "../services/videoApi";
import { doctorApi } from "../services/doctorApi";
import { patientApi } from "../services/patientApi";
import VideoSession from "../components/VideoSession";

export default function DoctorVideoPage({ appointmentId, doctorId }) {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    async function loadDoctor() {
      try {
        const d = await doctorApi.getDoctorById(doctorId);
        setDoctor(d.data);
      } catch (e) {
        console.error("Doctor fetch failed", e);
      }
    }
    loadDoctor();
  }, [doctorId]);

  useEffect(() => {
    async function loadVideoSession() {
      try {
        const res = await videoApi.getByAppointment(appointmentId);
        setSession(res.data);

        const p = await patientApi.getPatientById(res.data.patientId);
        setPatient(p.data);

        setLoading(false);
      } catch (e) {
        console.error("VideoSession fetch failed:", e);
      }
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
      userId={doctorId}
      displayName={`${doctor.firstName} ${doctor.lastName}`}

      appointmentId={appointmentId}
      doctorId={doctorId}
      patientId={patient.patientId}

      doctorName={doctor.firstName}
      patientName={patient.firstName}

      scheduledStart={session.scheduledStart}
      sessionStatus={session.status}
    />
   

    </>
  );
}
