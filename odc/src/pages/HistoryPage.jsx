import { usePatient } from "../context/PatientContext";
import Navbar from "../components/Navbar";
import "./HistoryPage.css";

export default function HistoryPage() {
  const { patientData } = usePatient();

  const history = patientData?.pastAppointments || [];

  return (
    <>
      <Navbar />
      <div className="history-page">
        <h2>Appointment History</h2>

        {history.length === 0 ? (
          <p>No past appointments.</p>
        ) : (
          <div className="history-list">
            {history.map((appt, index) => {
              const date = new Date(appt.appointmentDateTime);
              const formatted = `${date.toLocaleDateString()} — ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

              return (
                <div key={index} className="history-row">
                  <div>
                    <strong>Appointment Id {appt.appointmentId}</strong>
                    <p>Status: {appt.status}</p>
                    <p>Notes: {appt.notes}</p>
                  </div>

                  <span className="history-date">{formatted}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
