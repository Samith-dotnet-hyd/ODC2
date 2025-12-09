import React from "react";
import DashboardHeader from "../doctorcomponents/DashboardHeader";
import styled from "styled-components";
import DoctorProfile from "./DoctorProfile";

const Body = styled.div`
  padding: 20px;
   min-height: 100vh;
  background-image:url("src/assets/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
