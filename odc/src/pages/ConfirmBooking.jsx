// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../api";
// import "./ConfirmBooking.css";
// import { usePatient } from "../context/PatientContext";

// export default function ConfirmBooking() {
//   const { doctorId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();
// const [success, setSuccess] = useState(false);

//   const { patientId } = usePatient();

//   const [notes, setNotes] = useState("");
//   const [loading, setLoading] = useState(false);

//   const slot = state?.selectedSlot;
//   const date = state?.selectedDate;

//   if (!slot || !date) return <h2>Invalid booking details</h2>;

//   const appointmentDateTime = `${date}T${slot}:00`;

//   // ⭐ Simulated Payment
//   const handlePayment = () =>
//     new Promise(resolve => {
//       setTimeout(() => resolve("PAID"), 1000);
//     });

//   const handleConfirm = async () => {
//   setLoading(true);

//   try {
//     // 1. Auto-payment
//     await handlePayment();

//     // 2. Update slot
//    await api.post("http://localhost:5171/api/DoctorSlots/book", 
//   {
//     date,
//     hour: Number(slot)
//   },
//   {
//     params: { doctorId: Number(doctorId) }
//   }
// );


//     // 3. Create appointment
//     await api.post("http://localhost:5004/api/Appointement/CreateAppointment", {
//       doctorId: Number(doctorId),
//       patientId,
//       appointmentDateTime,
//       status: "Scheduled",
//       notes,
//     });

//     // Show success UI
//     setSuccess(true);

//     // Redirect after 1.5 seconds
//     setTimeout(() => navigate("/dashboard"), 1500);

//   } catch (err) {
//     console.error(err);
//   }

//   setLoading(false);
// };

//   return (
//     <div className="confirm-container">
//       <div className="confirm-card">

//         <h2 className="title">Confirm Your Appointment</h2>

//         <div className="summary-box">
//           <p><strong>Doctor ID:</strong> {doctorId}</p>
//           <p><strong>Date:</strong> {date}</p>
//           <p><strong>Time:</strong> {slot}</p>
//         </div>

//         <textarea
//           className="notes-box"
//           placeholder="Add notes for the doctor (optional)..."
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//         {success && (
//   <div className="success-banner">
//     ✓ Appointment Booked Successfully!
//   </div>
// )}

//         <button
//           className="pay-btn"
//           disabled={loading}
//           onClick={handleConfirm}
//         >
//           {loading ? "Processing..." : "Pay & Confirm Appointment"}
//         </button>

//         <button className="cancel-btn" onClick={() => navigate(-1)}>
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }



import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import "./ConfirmBooking.css";
import { usePatient } from "../context/PatientContext";

export default function ConfirmBooking() {
  const { doctorId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
const [success, setSuccess] = useState(false);

  const { patientId } = usePatient();
  const {patientData} = usePatient();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const slot = state?.selectedSlot;
  const date = state?.selectedDate;

  if (!slot || !date) return <h2>Invalid booking details</h2>;
const slotTime = slot.toString().padStart(2, "0");   // ensure 09 format

const appointmentDateTime = new Date(`${date}T${slotTime}:00:00`).toISOString();

//   const appointmentDateTime = `${date}T${slot}:00`;

  // ⭐ Simulated Payment
  const handlePayment = () =>
    new Promise(resolve => {
      setTimeout(() => resolve("PAID"), 1000);
    });

//  const handleConfirm = async () => {
//   setLoading(true);

//   try {
//     // 1️⃣ Auto-Payment (simulated)
//     await handlePayment();

//     // 2️⃣ Update doctor's slot
//     await api.post(
//       "http://localhost:5171/api/DoctorSlots/book",
//       {
//         date,
//         hour: Number(slot)
//       },
//       {
//         params: { doctorId: Number(doctorId) }
//       }
//     );

//     // 3️⃣ Create Appointment
//     const appointmentRes = await api.post(
//   "http://localhost:5004/api/Appointement/CreateAppointment",
//   {
//     doctorId: Number(doctorId),
//     patientId,
//     appointmentDateTime,
//     createdAt: new Date().toISOString(),    // ⭐ REQUIRED
//     status: "Scheduled",
//     notes: notes || "No notes"
//   }
// );


//     const appointment = appointmentRes.data;
//     const appointmentId = appointment.appointmentId;

//     // 4️⃣ SEND EMAIL NOTIFICATION
//     await api.post("https://localhost:7096/api/Notification/send-email", {
//       toEmail: patientData?.email,          // patient's email
//       toPhone: patientData?.phone || "",    // optional
//       subject: "Appointment Confirmation ✔",
//       message: `
// Dear ${patientData?.firstName},

// Your appointment has been successfully booked.

// 📌 **Appointment Details**
// - Appointment ID: ${appointmentId} 
// - Date: ${date}
// - Time: ${slot}:00
// - Status: Scheduled

// Thank you for choosing our healthcare service.
// We look forward to serving you.

// Regards,
// HealthCare Team
//       `
//     });

//     // 5️⃣ Show success UI
//     setSuccess(true);

//     // Redirect after 2 seconds
//     setTimeout(() => navigate("/dashboard"), 2000);

//   } catch (err) {
//     console.error("Booking Error:", err);
//   }

//   setLoading(false);
// };
const handleConfirm = async () => {
  setLoading(true);

  try {
    await handlePayment();

    // Update slot
    await api.post(
      "http://localhost:5171/api/DoctorSlots/book",
      { date, hour: Number(slot) },
      { params: { doctorId: Number(doctorId) } }
    );

    // Create Appointment
    const appointmentRes = await api.post(
      "http://localhost:5004/api/Appointement/CreateAppointment",
      {
        doctorId: Number(doctorId),
        patientId,
        appointmentDateTime,
        createdAt: new Date().toISOString(),
        status: "Scheduled",
        notes: notes || "No notes",
      }
    );

    const appointmentId = appointmentRes.data.appointmentId;
// patientData?.email
    // Send Email
    await api.post("https://localhost:7096/api/Notification/send-email", {
      toEmail: "samithreddykandala@gmail.com",
      toPhone: patientData?.phone || "",
      subject: "Appointment Confirmation",
      message: `
Hello ${patientData?.firstName},

Your appointment has been successfully booked.

✔ Appointment ID: ${appointmentId}
📅 Date: ${date}
⏰ Time: ${slot}:00

Thank you for using HealthCare.
      `
    });

    setSuccess(true);
    setTimeout(() => navigate("/dashboard"), 2000);

  } catch (err) {
    console.error("Booking Error:", err);
  }

  setLoading(false);
};

  return (
    <div className="confirm-container">
      <div className="confirm-card">

        <h2 className="title">Confirm Your Appointment</h2>

        <div className="summary-box">
          <p><strong>Doctor ID:</strong> {doctorId}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {slot}</p>
        </div>

        <textarea
          className="notes-box"
          placeholder="Add notes for the doctor (optional)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {success && (
  <div className="success-banner">
    ✓ Appointment Booked Successfully!
  </div>
)}

        <button
          className="pay-btn"
          disabled={loading}
          onClick={handleConfirm}
        >
          {loading ? "Processing..." : "Pay & Confirm Appointment"}
        </button>

        <button className="cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </button>

      </div>
    </div>
  );
}
