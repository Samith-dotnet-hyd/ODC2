import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./slots.css";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState(null);
  const [noSlots, setNoSlots] = useState(false); // NEW → show "no slots available"

  const prettyTime = (index) => index.toString().padStart(2, "0") + ":00";

  // ✅ Prevent booking past time slots
  const isPastSlot = (hour) => {
    if (!selectedDate) return false;

    const today = new Date();
    const selected = new Date(selectedDate);

    const todayDateOnly = new Date(today.toDateString());
    const selectedDateOnly = new Date(selected.toDateString());

    if (selectedDateOnly < todayDateOnly) return true;

    // Same day → block hour <= current hour
    if (selectedDateOnly.getTime() === todayDateOnly.getTime()) {
      return hour <= today.getHours();
    }

    return false;
  };

  const handleSlotClick = (hour, value) => {
    if (isPastSlot(hour)) {
      alert("You cannot book a slot in the past.");
      return;
    }

    if (value === 0) {
      alert("Doctor is not available at this time.");
      return;
    }

    if (value === 2) {
      alert("This slot is already booked.");
      return;
    }

    if (value === 1) {
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

      const response = await axios.get(
        "http://localhost:5171/api/DoctorSlots",
        { params: { doctorId, date: formattedDate } }
      );

      setSlots(response.data);
      setNoSlots(false);

    } catch (err) {
      console.error("Error fetching slots:", err);

      if (err.response && err.response.status === 404) {
        // 🔥 Backend returned "not found"
        setSlots(null);
        setNoSlots(true);
      }
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
            setNoSlots(false);
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

        {/* ⚠️ NO SLOTS AVAILABLE */}
        {noSlots && (
          <p className="no-slots">No slots available for the selected date.</p>
        )}

        {/* SLOT GRID */}
        {slots && (
          <div className="slot-grid">
            {Object.keys(slots.slots).map((key) => {
              const hour = Number(key);
              const value = slots.slots[key];

              return (
                <div
                  key={key}
                  className={`slot-box ${
                    isPastSlot(hour)
                      ? "past-slot"
                      : value === 0
                      ? "closed"
                      : value === 1
                      ? "available"
                      : "booked"
                  }`}
                  onClick={() =>
                    !isPastSlot(hour) && handleSlotClick(hour, value)
                  }
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
