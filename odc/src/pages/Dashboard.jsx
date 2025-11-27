import "./Dashboard.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import AppointmentCard from "../components/AppointmentCard";
import IconCard from "../components/IconCard";
import VitalChart from "../components/VitalChart";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, appointments } = useContext(AppContext);

  return (
    <>
        <Navbar/>
    <div className="dashboard">
      
      <h1>Hello, <span>{user.name}</span></h1>

      <div className="appointment-list">
  {appointments.map((doc, index) => (
    <AppointmentCard key={index} doctor={doc} />
  ))}
</div>


      <div className="icon-row">
        <IconCard title="My Health Records" icon="📄" />
        <IconCard title="Prescriptions" icon="💊" />
        <IconCard title="Book Appointment" icon="📅" link="/doctors" />
        <IconCard title="Messages" icon="💬" />
      </div>

      <div className="vital-section">
        <h2>Vital Signs</h2>
        <VitalChart />
      </div>
    </div>
    </>
  );
}
