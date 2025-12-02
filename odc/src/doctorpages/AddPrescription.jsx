import React, { useState, useEffect } from "react";
import { useParams, useSearchParams ,useNavigate} from "react-router-dom";
 
 
 
export default function AddPrescription() {
    const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [searchParams] = useSearchParams();
 
  const doctorId = searchParams.get("doctor");
  const patientId = searchParams.get("patient");
 
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([
    { medicine: "", dosage: "", duration: "", notes: "" }
  ]);
 
  // Add new medicine row
  const addMedicine = () => {
    setItems([...items, { medicine: "", dosage: "", duration: "", notes: "" }]);
  };
 
  // Update item fields
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
 
  // Submit Prescription
  const submitPrescription = async () => {
    const payload = {
      appointmentId: Number(appointmentId),
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      items,
      notes
    };
 
    try {
      const res = await fetch("https://localhost:7107/api/Prescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
 
      if (res.ok) {
        alert("Prescription saved successfully!");
       //  window.location.href = "dashboard/appointments";
        navigate("/doctordashboard/appointments");
      } else {
        alert("Failed to save prescription");
      }
    } catch (err) {
      console.error(err);
      alert("Error while saving prescription");
    }
  };
 
  return (
    <div style={{ width: "70%", margin: "auto", padding: "20px" }}>
      <h2>Create Prescription</h2>
 
      <p><b>Appointment ID:</b> {appointmentId}</p>
      <p><b>Doctor ID:</b> {doctorId}</p>
      <p><b>Patient ID:</b> {patientId}</p>
 
      <h3>Medicines</h3>
 
      {items.map((item, index) => (
        <div key={index} style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px"
        }}>
          <input
            type="text"
            placeholder="Medicine Name"
            value={item.medicine}
            onChange={(e) => updateItem(index, "medicine", e.target.value)}
            style={{ width: "100%", marginBottom: "8px" ,height:"25px", borderRadius:"5px",padding:"2px"}}
          />
 
          <input
            type="text"
            placeholder="Dosage"
            value={item.dosage}
            onChange={(e) => updateItem(index, "dosage", e.target.value)}
            style={{ width: "100%", marginBottom: "8px" ,height:"25px", borderRadius:"5px",padding:"2px"}}
          />
 
          <input
            type="text"
            placeholder="Duration"
            value={item.duration}
            onChange={(e) => updateItem(index, "duration", e.target.value)}
            style={{ width: "100%", marginBottom: "8px" ,height:"25px", borderRadius:"5px",padding:"2px"}}
          />
 
          <input
            type="text"
            placeholder="Notes"
            value={item.notes}
            onChange={(e) => updateItem(index, "notes", e.target.value)}
            style={{ width: "100%", marginBottom: "8px" ,height:"25px", borderRadius:"5px",padding:"2px"}}
          />
        </div>
      ))}
 
      <button onClick={addMedicine} style={{
        padding: "10px 20px",
        background: "#1e78f0",
        color: "white",
        border: "none",
        borderRadius: "6px"
      }}>
        + Add Another Medicine
      </button>
 
      <h3 style={{ marginTop: "20px" }}>General Notes</h3>
      <textarea
        rows="4"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%" , borderRadius:"5px",padding:"2px"}}
      />
 
      <br /><br />
      <button onClick={submitPrescription} style={{
        padding: "12px 25px",
        background: "#27ae60",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px"
      }}>
        Submit Prescription
      </button>
    </div>
  );
}
 