import "./Dashboard.css";
import { useEffect, useState } from "react";
import { usePatient } from "../context/PatientContext";
import AppointmentCard from "../components/AppointmentCard";
import IconCard from "../components/IconCard";
import VitalChart from "../components/VitalChart";
import Navbar from "../components/Navbar";
import api from "../api";
import { useNavigate  } from "react-router-dom";
import HistoryPage from "./HistoryPage";
export default function Dashboard() {
  const { patientId, patientData, setPatientData } = usePatient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const loadDashboardData = async () => {
      try {
        const patientRes = await api.get(`/patients/${patientId}`);

        const appointmentsRes = await fetch(
          `http://localhost:5004/api/Appointement/patient/${patientId}?page=1&pageSize=20`
        );

        const appointments = await appointmentsRes.json();

        const all = appointments.past || [];

// Sort order
const statusOrder = {
  "Scheduled": 1,
  "Completed": 2,
  "Cancelled": 3
};

const sortByStatus = (a, b) => {
  return statusOrder[a.status] - statusOrder[b.status];
};

// Split by status
const upcoming = all
  .filter(a => a.status === "Scheduled")
  .sort(sortByStatus);

const history = all
  .filter(a => a.status !== "Scheduled")
  .sort(sortByStatus);

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
  const navigate = useNavigate();

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>
          Hello, <span>{patientData?.firstName} {patientData?.lastName}</span>
        </h1>

        {/* UPCOMING */}
        <h2>Upcoming Appointments</h2>
        <div className="appointment-list">
          {(patientData?.upcomingAppointments || []).map((appt, index) => (
            <AppointmentCard key={index} appointment={appt} />
          ))}
        </div>

        {/* HISTORY */}
        {/* <h2>Appointment History</h2>
        <div className="appointment-list history">
          {(patientData?.pastAppointments || []).map((appt, index) => (
            <AppointmentCard key={index} appointment={appt} />
          ))}
        </div> */}

        <div className="icon-row">
          <IconCard title="My Health Records" icon="📄" />
          <IconCard title="Prescriptions" icon="💊" />
          <IconCard title="Book Appointment" icon="📅" link="/dashboard/doctors" />
          <IconCard title="Messages" icon="💬" />
        </div>
          <button 
  className="history-btn" 
  onClick={() => navigate("/dashboard/history")}
>
  View Appointment History
</button>

        <div className="vital-section">
          <h2>Vital Signs</h2>
          <VitalChart />
        </div>
      </div>
    </>
  );
}
