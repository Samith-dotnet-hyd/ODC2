import React from "react";
import DashboardHeader from "../doctorcomponents/DashboardHeader";
import styled from "styled-components";
import DoctorProfile from "./DoctorProfile";

const Body = styled.div`
  padding: 20px;
`;

export default function DoctorDashboard() {
  return (
    <>
      <DashboardHeader />
      <Body>
        <h2>Welcome to your dashboard</h2>
        <p>Select a page from the navigation above.</p>
        
      </Body>
    </>
  );
}
