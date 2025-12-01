import { useEffect, useState } from "react";
import { usePatient } from "../context/PatientContext";
import api from "../api";
import "./Prescriptions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Prescriptions() {
  const { patientId } = usePatient();

  const [prescriptions, setPrescriptions] = useState([]);
  const [doctorMap, setDoctorMap] = useState({}); // doctorId → doctor details
  const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 const downloadPdf = async (pdfUrl, fileName) => {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "prescription.pdf";
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error("PDF download failed:", error);
    alert("Failed to download prescription!");
  }
};


  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        // 1️⃣ Load prescriptions
        const res = await fetch(
          `https://localhost:7107/api/Prescription/patient/${patientId}`
        );
        const data = await res.json();

        setPrescriptions(data);

        // 2️⃣ Extract doctorIDs
        const doctorIds = [...new Set(data.map((p) => p.doctorId))];

        // 3️⃣ Fetch doctor details for each ID
        const doctorResponses = await Promise.all(
          doctorIds.map((id) => api.get(`/doctor/${id}`))
        );

        const map = {};
        doctorResponses.forEach((res) => {
          map[res.data.doctorId] = res.data;
        });

        setDoctorMap(map);
      } catch (err) {
        console.error("Error loading prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, [patientId]);

  if (loading) return <h2>Loading prescriptions...</h2>;

  return (
       
       <>
       <div className="back-btn-wrapper">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
       <div className="prescription-container">
    
      <h1 className="title">Your Prescriptions</h1>

      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        prescriptions.map((p) => {
          const doctor = doctorMap[p.doctorId];
          const created = new Date(p.createdAt).toLocaleDateString("en-GB");
          const itemCount = p.items?.length || 0;

          return (
            <div key={p.prescriptionId} className="prescription-row">
              <div className="row-left">
                <div className="row-title">Prescription #{p.prescriptionId}</div>
                <div className="row-sub">
                  {doctor
                    ? `Dr. ${doctor.firstName} ${doctor.lastName} • ${doctor.specialization}`
                    : "Loading doctor..."}
                </div>
                <div className="row-meta">
                  {created} • {itemCount} medicine(s)
                </div>
              </div>

              <div className="row-actions">
                <button
                  className="btn-view"
                  onClick={() => window.open(p.pdfUrl, "_blank")}
                >
                  View
                </button>

                
                <button
  className="btn-download"
  onClick={() => downloadPdf(p.pdfUrl, "prescription.pdf")}
>
  Download
</button>


              </div>
            </div>
            
          );
        })
      )}
    </div>
       </>
    
    
  );
}
