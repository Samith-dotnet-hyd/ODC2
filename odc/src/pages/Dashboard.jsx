import "./Dashboard.css";
import { useEffect, useState } from "react";
import { usePatient } from "../context/PatientContext";
import AppointmentCard from "../components/AppointmentCard";
import IconCard from "../components/IconCard";
import VitalChart from "../components/VitalChart";
import Navbar from "../components/Navbar";
import api from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { patientId, patientData, setPatientData } = usePatient();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!patientId) return;

    const loadDashboardData = async () => {
      try {
        // 1️⃣ Fetch patient details (gateway)
        const patientRes = await api.get(`/patients/${patientId}`);

        // 2️⃣ Fetch appointments (direct microservice)
//         const appointmentsRes = await api.get(`/appointments/patient/${patientId}`, {
//   params: { page: 1, pageSize: 20 }
// });
const appointmentsRes = await axios.get(
  `http://localhost:5004/api/Appointment/patient/${patientId}`,
  {
    params: { page: 1, pageSize: 20 }
  }
);


const appointments = appointmentsRes.data;  // ✔ correct


        // NEW RESPONSE FORMAT:
        // { past: [...], future: [...] }

        const future = appointments.future || [];
        const past = appointments.past || [];

        // 🔥 Sort order: Scheduled → Completed → Cancelled
        const statusOrder = {
          "Scheduled": 1,
          "Completed": 2,
          "Cancelled": 3
        };

        const sortByStatus = (a, b) => {
          return statusOrder[a.status] - statusOrder[b.status];
        };

        // 🚀 UPCOMING = future only + status sorting
        const upcoming = future.sort(sortByStatus);

        // 🕒 HISTORY = past only + status sorting
        const history = past.sort(sortByStatus);

        // 3️⃣ Save into context
        setPatientData({
          ...patientRes.data,
          upcomingAppointments: upcoming,
          pastAppointments: history,
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [patientId, setPatientData]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>
          Hello,{" "}
          <span>
            {patientData?.firstName} {patientData?.lastName}
          </span>
        </h1>

        {/* UPCOMING APPOINTMENTS */}
        <h2>Upcoming Appointments</h2>
        <div className="appointment-list">
          {(patientData?.upcomingAppointments || []).length > 0 ? (
            patientData.upcomingAppointments.map((appt) => (
              <AppointmentCard key={appt.appointmentId} appointment={appt} />
            ))
          ) : (
            <p>No upcoming appointments</p>
          )}
        </div>

        {/* HISTORY BUTTON */}
        

        {/* ICON ROW */}
        <div className="icon-row">
          <IconCard title="My Health Records" icon="📄" />
          <IconCard title="Prescriptions" icon="💊" link="/dashboard/prescriptions" />
          <IconCard title="Book Appointment" icon="📅" link="/dashboard/doctors" />
          <IconCard title="Messages" icon="💬" />
        </div>
<button
          className="history-btn"
          onClick={() => navigate("/dashboard/history")}
        >
          View Appointment History
        </button>
        {/* VITAL SIGNS */}
        <div className="vital-section">
          <h2>Vital Signs</h2>
          <VitalChart />
        </div>

      </div>
    </>
  );
}
