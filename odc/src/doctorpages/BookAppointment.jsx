import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./slots.css";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState(null);

  const prettyTime = (index) => index.toString().padStart(2, "0") + ":00";

  const handleSlotClick = (hour, value) => {
    if (value === 0) {
      alert("Doctor is not available at this time.");
      return;
    }

    if (value === 2) {
      alert("This slot is already booked.");
      return;
    }

    if (value === 1) {
      // 🟢 Slot Available → Go to confirm page
      navigate(`/dashboard/book/${doctorId}/confirm`, {
        state: {
          selectedSlot: hour,
          selectedDate: selectedDate,
        },
      });
    }
  };

  const fetchSlots = async () => {
    try {
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

      const response = await axios.get("http://localhost:5171/api/DoctorSlots", {
        params: { doctorId, date: formattedDate },
      });

      setSlots(response.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  return (
    <>
      <div className="back-btn-wrapper">
        <button className="back-btn" onClick={() => navigate("/dashboard/doctors")}>
          ← Back
        </button>
      </div>

      <div className="slot-wrapper">
        <h2>Booking for Doctor {doctorId}</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSlots(null);
          }}
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
                  onClick={() => handleSlotClick(hour, value)}
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
