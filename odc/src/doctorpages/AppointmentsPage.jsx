import React from "react";
import DashboardHeader from "../doctorcomponents/DashboardHeader";

export default function AppointmentsPage() {
  return (
    <>
      <DashboardHeader />
      <div style={{ padding: "20px" }}>
        <h2>Upcoming Appointments</h2>
        <p>Your appointments will appear here.</p>
      </div>
    </>
  );
}
