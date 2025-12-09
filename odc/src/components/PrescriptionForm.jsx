import React, { useState } from "react";
import { prescriptionApi } from "../services/prescriptionApi";
import { notificationApi } from "../services/notificationApi";

import "../styles/prescriptionForm.css";

export default function PrescriptionForm({ appointmentId, patientId, doctorId, onClose }) {

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    const payload = {
      appointmentId,
      patientId,
      doctorId,
      items: [
        {
          medicine,
          dosage,
          duration,
          notes
        }
      ],
      notes
    };

    try {
      const res = await prescriptionApi.create(payload);

      alert("Prescription created!");

      // SEND EMAIL TO PATIENT
      await notificationApi.sendEmail({
        toEmail: "samithreddykandala"+ "@gmail.com",  // ← replace with actual email
        toPhone:"9999999999",
        subject: "Your Prescription is Ready",
        message: `Your prescription is ready. View it here:\n${res.data.pdfUrl}`
      });

      onClose();

    } catch (err) {
      console.error("Prescription error", err);
      alert("Failed to create prescription");
    }
  };

  return (
    <div className="prescription-popup">
      <div className="popup-content">
        <h3>Write Prescription</h3>

        <input
          placeholder="Medicine"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <input
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />

        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="btn-row">
          <button onClick={handleSubmit} className="save-btn">Submit</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}
