// AppointmentSummary.jsx
import React from "react";
import styled from "styled-components";
 
/* ---- styled components ---- */
const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
 
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
 
const Card = styled.div`
  flex: 1;
  padding: 20px;
  background: ${(props) => props.color || "#ddd"};
  color: white;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: 0.18s ease;
  min-width: 140px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
 
  &.active {
    transform: translateY(-6px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.12);
    border: 3px solid rgba(255,255,255,0.12);
  }
 
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
 
  p {
    font-size: 20px;
    margin-top: 8px;
    font-weight: 700;
  }
 
  &:hover {
    opacity: 0.95;
  }
`;
 
/* ---- component ---- */
export default function AppointmentSummary({ appointments = [], activeFilter, setActiveFilter }) {
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "Scheduled").length;
  const done = appointments.filter(a => a.status === "Completed").length;
 
  return (
    <SummaryWrapper>
      <Card
        color="#1e78f0"
        onClick={() => setActiveFilter("All")}
        className={activeFilter === "All" ? "active" : ""}
      >
        <h3>Total</h3>
        <p>{total}</p>
      </Card>
 
      <Card
        color="#f1c40f"
        onClick={() => setActiveFilter("Scheduled")}
        className={activeFilter === "Scheduled" ? "active" : ""}
        style={{ color: "#111" }}
      >
        <h3>Pending</h3>
        <p>{pending}</p>
      </Card>
 
      <Card
        color="#27ae60"
        onClick={() => setActiveFilter("Completed")}
        className={activeFilter === "Completed" ? "active" : ""}
      >
        <h3>Completed</h3>
        <p>{done}</p>
      </Card>
    </SummaryWrapper>
  );
}
 
 