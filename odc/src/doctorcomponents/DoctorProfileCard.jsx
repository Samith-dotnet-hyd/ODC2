import React from "react";
import styled from "styled-components";
import { useDoctor } from "../context/DoctorContext";

const Card = styled.div`
  background: white;
  padding: 25px;
  width: 420px;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.1);
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1e78f0;
  margin-bottom: 20px;
`;

export default function DoctorProfileCard() {
  const { doctor } = useDoctor();

  return (
    <Card>
      <Img src={doctor.image || "/default-profile.png"} />
      <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
      <p><b>Email:</b> {doctor.email}</p>
      <p><b>Phone:</b> {doctor.phoneNo}</p>
      <p><b>Specialization:</b> {doctor.specialization}</p>
      <p><b>Hospital:</b> {doctor.hospitalName}</p>
      <p><b>Experience:</b> {doctor.experiences} years</p>
      <p><b>Consultation Fee:</b> ₹{doctor.consultationFee}</p>
      <p><b>Rating:</b> ⭐ {doctor.rating}</p>
    </Card>
  );
}
