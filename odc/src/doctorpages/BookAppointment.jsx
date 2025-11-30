import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./slots.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function BookAppointment() {
  // Get doctorId from URL
  const { doctorId } = useParams();
const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState(null);
const handleSlotClick = async (hour, value) => {
  // value meanings:
  // 0 = busy (not available)
  // 1 = available
  // 2 = booked
  
  if (value === 0) {
    alert("Doctor is not available at this time.");
    return;
  }

  if (value === 2) {
    alert("This slot is already booked.");
    return;
  }

  // value === 1 → available
  const confirmBooking = window.confirm(
    `Book appointment at ${prettyTime(hour)} on ${selectedDate}?`
  );

  if (!confirmBooking) return;

  try {
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    const res = await axios.post(
      "http://localhost:5171/api/DoctorSlots/book",
      {
        date: formattedDate,
        hour: hour
      },
      {
        params: {
          doctorId: Number(doctorId)
        }
      }
    );

    console.log("BOOK RESPONSE:", res.data);

    if (res.data.success) {
      alert("Appointment booked successfully!");
      fetchSlots(); // reload grid to update booked slot
    } else {
      alert("Failed to book appointment.");
    }

  } catch (err) {
    console.error("Booking error:", err);
    alert(err.response?.data || "Booking failed");
  }
};


  const fetchSlots = async () => {
    try {
        const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
        
      const response = await axios.get(
        "http://localhost:5171/api/DoctorSlots",
        {
          params: { doctorId, date: formattedDate }
        }
      );
// console.log("API RESPONSE:", response.data);
      setSlots(response.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSlots(null); // reset previous slots
  };

  const prettyTime = (index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`; // 00:00, 01:00, 02:00 ...
  };

  return (
    <>
    <div className="back-btn-wrapper">
            <button className="back-btn" onClick={() => navigate("/dashboard/doctors")}>
              ← Back 
            </button>
          </div>
          
    {/* <Navbar /> */}
          
    <div className="slot-wrapper">
      
      <h2>Booking for Doctor {doctorId}</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="date-picker"
      />

      <button
        onClick={fetchSlots}
        disabled={!selectedDate}
        className="fetch-btn"
      >
        Show Slots
      </button>

      {slots && (
  <div className="slot-grid">
    {Object.keys(slots.slots).map((key) => {
      const value = slots.slots[key];
      const hour = Number(key);

      return (
        <div
          key={key}
          className={`slot-box ${
            value === 0 ? "closed" :
            value === 1 ? "available" :
            "booked"
          }`}
          onClick={() => {  console.log("CLICKED SLOT", hour, value);  // 👈 add this
handleSlotClick(hour, value)}}
        >
          {prettyTime(hour)}
        </div>
      );
    })}
  </div>
)}


    </div>
    </>
  );
}
