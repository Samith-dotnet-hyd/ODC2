
 
import React, { useState } from "react";
import styled from "styled-components";
 
const TableWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  overflow-x: auto;
`;
 
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
 
  th, td {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
 
  .scheduled { color: #f39c12; font-weight: 600; }
  .completed { color: #27ae60; font-weight: 600; }
  .cancelled { color: #e74c3c; font-weight: 600; }
`;
 
const ViewButton = styled.button`
  padding: 6px 12px;
  background: #1e78f0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
 
  &:hover {
    background: #1664c4;
  }
`;
 
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
 
const ModalBox = styled.div`
  width: 400px;
  max-width: 90%;
  background: white;
  padding: 25px;
  border-radius: 12px;
`;
 
const CloseBtn = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
`;
 
export default function AppointmentTable({ appointments, activeFilter }) {
  const [selected, setSelected] = useState(null);
 
  const filteredAppointments =
    activeFilter === "All"
      ? appointments
      : appointments.filter(a => a.status === activeFilter);
 
  return (
    <>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
 
          <tbody>
            {filteredAppointments.map((a) => {
              const dateObj = new Date(a.appointmentDateTime);
              const date = dateObj.toISOString().split("T")[0];
              const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 
              return (
                <tr key={a.appointmentId}>
                  <td>{a.appointmentId}</td>
                  <td>{a.patientId}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>
                    <span className={a.status.toLowerCase()}>
                      {a.status}
                    </span>
                  </td>
                  <td>{a.notes || "—"}</td>
                  <td>
                    <ViewButton onClick={() => setSelected(a)}>View</ViewButton>
                     <ViewButton
    style={{ marginLeft: "8px", background: "#27ae60" }}
    onClick={() => window.location.href = `/add-prescription/${a.appointmentId}?doctor=${a.doctorId}&patient=${a.patientId}`}
  >
    Add Prescription
  </ViewButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
 
      {selected && (
        <ModalBackdrop>
          <ModalBox>
            <h2>Appointment Details</h2>
 
            <p><b>ID:</b> {selected.appointmentId}</p>
            <p><b>Patient ID:</b> {selected.patientId}</p>
            <p><b>Date/Time:</b> {selected.appointmentDateTime}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Notes:</b> {selected.notes}</p>
 
            <CloseBtn onClick={() => setSelected(null)}>Close</CloseBtn>
          </ModalBox>
        </ModalBackdrop>
      )}
    </>
  );
}
 
 