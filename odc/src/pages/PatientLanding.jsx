import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../context/PatientContext";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9f2ff;
`;

const Box = styled.div`
  background: white;
  padding: 35px;
  width: 400px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 2px solid #1e78f0;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  background: #1e78f0;
  color: white;
  padding: 14px;
  border: none;
  margin-top: 15px;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
`;

export default function PatientLanding() {
  const [patientId, setPatientId] = useState("");
  const { setPatient } = usePatient();
  const navigate = useNavigate();

  const fetchPatient = async () => {
    try {
      const res = await fetch(`http://localhost:5138/api/Patients/${patientId}`);

      if (!res.ok) {
        alert("Patient not found!");
        return;
      }

      const data = await res.json();
      setPatient(data);

      navigate("/dashboard");
    } catch (error) {
      alert("Server error!");
    }
  };

  return (
    <Container>
      <Box>
        <h2>Enter Patient ID</h2>
        <Input 
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <Button onClick={fetchPatient}>Continue</Button>
      </Box>
    </Container>
  );
}
