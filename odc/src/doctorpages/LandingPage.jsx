import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../context/DoctorContext";

const Container = styled.div`
  height: 100vh;
//   width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e9f2ff;
`;

const Box = styled.div`
  background: white;
  padding: 30px;
  width: 350px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #1e78f0;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  background: #1e78f0;
  color: white;
  padding: 12px;
  border: none;
  margin-top: 15px;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #1666d0;
  }
`;

export default function LandingPage() {
  const [doctorId, setDoctorId] = useState("");
  const navigate = useNavigate();
  const { setDoctor } = useDoctor();

  const fetchDoctor = async () => {
    try {
      const res = await fetch(`http://localhost:5108/api/doctors/${doctorId}`);

      const data = await res.json();

      setDoctor(data);
      navigate("/doctordashboard");
    } catch (err) {
      alert("Doctor not found!");
    }
  };

// const fetchDoctor = async () => {
//   try {
//     // Hardcoded doctor details
//     const data = {
//       DoctorId: doctorId,
//       FirstName: "Praveen",
//       LastName: "Kumar",
//       Image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//       Email: "praveen.doctor@example.com",
//       PhoneNo: "9876543210",
//       Specialization: "Cardiologist",
//       RegistrationNumber: "REG12345",
//       HospitalName: "Apollo Hospitals",
//       Experiences: 8,
//       ConsultationFee: 500,
//       AmountEarned: 150000,
//       Rating: 4.7,
//     };

//     setDoctor(data);
//     navigate("/doctordashboard");

//   } catch (err) {
//     alert("Doctor not found!");
//   }
// };


  return (
    <Container>
      <Box>
        <h2>Enter Doctor ID</h2>
        <Input 
          placeholder="Doctor ID" 
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <Button onClick={fetchDoctor}>Continue</Button>
      </Box>
    </Container>
  );
}
