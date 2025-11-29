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
  const [inputId, setInputId] = useState("");
  const { setPatientId, setPatientData } = usePatient();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!inputId.trim()) {
      alert("Please enter a valid patient ID");
      return;
    }

    setPatientId(inputId);     // store ID globally
    setPatientData(null);      // clear previous patient's data

    navigate("/dashboard");    // dashboard will fetch fresh data
  };

  return (
    <Container>
      <Box>
        <h2>Enter Patient ID</h2>
        <Input
          placeholder="Patient ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button onClick={handleContinue}>Continue</Button>
      </Box>
    </Container>
  );
}
