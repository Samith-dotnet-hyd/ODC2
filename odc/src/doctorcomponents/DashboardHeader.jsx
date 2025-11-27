import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../context/DoctorContext";

const HeaderBar = styled.div`
  background: #1e78f0;
  padding: 18px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius:10px;

  position: sticky;
  top: 0;
  z-index: 1000;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 2px solid white;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavBtn = styled.div`
  margin: 0 12px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { doctor } = useDoctor();

  return (
    <HeaderBar>
      <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>

      <div style={{ display: "flex", alignItems: "center" }}>
        <NavBtn onClick={() => navigate("/doctordashboard/profile")}>Profile</NavBtn>
        <NavBtn onClick={() => navigate("/doctordashboard/appointments")}>Appointments</NavBtn>
        <NavBtn onClick={() => navigate("/doctordashboard/calendar")}>My Calendar</NavBtn>

        <ProfileSection onClick={() => navigate("/doctordashboard/profile")}>
          <Img src={doctor.Image || "/default-profile.png"} />
        </ProfileSection>
      </div>
    </HeaderBar>
  );
}
