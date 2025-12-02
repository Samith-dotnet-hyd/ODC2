import React, { useState, useEffect } from "react";
import AppointmentSummary from "./AppointmentSummary";
import AppointmentTable from "./AppointmentTable";
import DashboardHeader from "../doctorcomponents/DashboardHeader";
import { useDoctor } from "../context/DoctorContext";
 
export default function Appointment() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [appointments, setAppointments] = useState([]);
 
  const { doctor } = useDoctor();
  const doctorId = doctor?.doctorId;
 
  // Extra filters
  const [date, setDate] = useState("2025-02-12 09:00:00.0000000");
  const [timezone, setTimezone] = useState("UTC");
 
  const fetchAppointments = async () => {
    if (!doctorId) return;
 
    try {
      const encodedDate = encodeURIComponent(date);
 
      const url = `http://localhost:5004/api/Appointment/doctor/${doctorId}?date=${encodedDate}&timezone=${timezone}`;
 
      console.log("Fetching:", url);
 
      const res = await fetch(url);
      const data = await res.json();
 
      setAppointments(data);
    } catch (err) {
      console.error("Error loading appointments:", err);
    }
  };
 
  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);
 
  return (
    <>
      <DashboardHeader />
 
      <div style={{ width: "80%", margin: "auto", padding: "20px 0" }}>
       
        {/* Filters UI */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div>
            <label>Date & Time</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "220px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
 
          <div>
            <label>Timezone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              style={{
                width: "120px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
 
          <button
            onClick={fetchAppointments}
            style={{
              background: "#1e78f0",
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Fetch Appointments
          </button>
        </div>
 
        {/* Summary + Table */}
        <AppointmentSummary
          appointments={appointments}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
 
        <AppointmentTable appointments={appointments} activeFilter={activeFilter} />
      </div>
    </>
  );
}