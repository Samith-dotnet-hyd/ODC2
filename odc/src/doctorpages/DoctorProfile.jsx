import React from "react";
import DashboardHeader from "../doctorcomponents/DashboardHeader";
import DoctorProfileCard from "../doctorcomponents/DoctorProfileCard";

export default function DoctorProfile() {
  return (
    <>
      <DashboardHeader />
      <div style={{ padding: "20px" }}>
        <DoctorProfileCard />
      </div>
    </>
  );
}
