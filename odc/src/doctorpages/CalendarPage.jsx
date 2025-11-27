// import React from "react";
 import DashboardHeader from "../doctorcomponents/DashboardHeader";

// export default function CalendarPage() {
//   return (
//     <>
//       <DashboardHeader />
//       <div style={{ padding: "20px" }}>
//         <h2>My Calendar</h2>
//         <p>Schedule view coming soon.</p>
//       </div>
//     </>
//   );
// }
import { useDoctor } from "../context/DoctorContext";
import React, { useEffect, useState } from "react";
import DayScheduleCard from "../doctorcomponents/DayScheduleCard";
import "./doctorSchedule.css";

// export default function CalendarPage({ doctorId }) {
//   const [schedule, setSchedule] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://localhost:8080/api/doctor/${doctorId}/schedule`)
// //       .then((res) => res.json())
// //       .then((data) => setSchedule(data.days))
// //       .catch((err) => console.error("Error:", err));
// //   }, [doctorId]);

// useEffect(() => {
//   const sampleData = {
//     doctorId: 1,
//     days: [
//       {
//         slotDate: "2025-11-26",
//         slots: {
//           0: 0,
//           1: 0,
//           2: 0,
//           3: 0,
//           4: 0,
//           5: 0,
//           6: 0,
//           7: 0,
//           8: 0,
//           9: 0,
//           10: 0,
//           11: 0,
//           12: 0,
//           13: 0,
//           14: 0,
//           15: 2,
//           16: 1,
//           17: 1,
//           18: 1,
//           19: 1,
//           20: 0,
//           21: 0,
//           22: 0,
//           23: 0
//         }
//       },
//       {
//         slotDate: "2025-11-27",
//         slots: {
//           0: 0,
//           1: 0,
//           2: 0,
//           3: 0,
//           4: 0,
//           5: 0,
//           6: 0,
//           7: 0,
//           8: 0,
//           9: 0,
//           10: 0,
//           11: 0,
//           12: 0,
//           13: 0,
//           14: 0,
//           15: 1,
//           16: 1,
//           17: 1,
//           18: 1,
//           19: 1,
//           20: 0,
//           21: 0,
//           22: 0,
//           23: 0
//         }
//       },
//       {
//         slotDate: "2025-11-28",
//         slots: {
//           0: 0,
//           1: 0,
//           2: 0,
//           3: 0,
//           4: 0,
//           5: 0,
//           6: 0,
//           7: 0,
//           8: 0,
//           9: 0,
//           10: 0,
//           11: 0,
//           12: 0,
//           13: 0,
//           14: 0,
//           15: 1,
//           16: 1,
//           17: 1,
//           18: 1,
//           19: 1,
//           20: 0,
//           21: 0,
//           22: 0,
//           23: 0
//         }
//       }
//     ]
//   };

//   setSchedule(sampleData.days);
// }, []);


//   return (
//     <>
//     <DashboardHeader />
//     <div className="schedule-container">
//       <h2 className="schedule-title">Upcoming Schedule</h2>

//       {schedule.length === 0 ? (
//         <p className="no-data">No schedule available</p>
//       ) : (
//         schedule.map((day) => (
//           <DayScheduleCard
//             key={day.slotDate}
//             date={day.slotDate}
//             slots={day.slots}
//           />
//         ))
//       )}
//     </div>
//     </>
//   );
// }

export default function CalendarPage() {
  const { doctor } = useDoctor();
  const doctorId = doctor?.DoctorId || doctor?.doctorId || null; // FIX: Use PascalCase (from normalized object)
 
  const [schedule, setSchedule] = useState([]);
  const [startDate, setStartDate] = useState("2025-02-12");
  const [range, setRange] = useState(7);
 
  const fetchSlots = async () => {
    if (!doctorId) return;
 
    try {
      const response = await fetch(
        `http://localhost:5171/api/DoctorSlots/range?doctorId=${doctorId}&start=${startDate}&days=${range}`
      );
 
      const data = await response.json();
      setSchedule(data.days);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };
 
  useEffect(() => {
    fetchSlots();
  }, [doctorId]);
 
  return (
    <>
      <DashboardHeader />
 
      {/* 🌟 Inline CSS for Filters */}
      <style>{`
        .filters {
          display: flex;
          gap: 20px;
          align-items: center;
          background: white;
          padding: 16px 22px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
 
        .filters label {
          display: flex;
          flex-direction: column;
          font-weight: 600;
          color: #1e3a5f;
          font-size: 15px;
        }
 
        .filters input {
          margin-top: 6px;
          padding: 10px 12px;
          border: 2px solid #1e78f0;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: 0.2s ease;
        }
 
        .filters input:focus {
          border-color: #155ac6;
          box-shadow: 0 0 5px rgba(30,120,240,0.4);
        }
 
        .fetch-btn {
          padding: 12px 20px;
          background: #1e78f0;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
          margin-top: 18px;
          height: 42px;
        }
 
        .fetch-btn:hover {
          background: #1666d0;
        }
 
        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: flex-start;
          }
 
          .fetch-btn {
            width: 100%;
          }
        }
      `}</style>
 
      <div className="schedule-container">
        <h2 className="schedule-title">Doctor Schedule</h2>
 
        {/* 🔹 Filters Section */}
        <div className="filters">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
 
          <label>
            Range (days):
            <input
              type="number"
              value={range}
              min="1"
              max="14"
              onChange={(e) => setRange(e.target.value)}
            />
          </label>
 
          <button onClick={fetchSlots} className="fetch-btn">
            Fetch Schedule
          </button>
        </div>
 
        {/* 🔹 Display Slots */}
        {schedule.length === 0 ? (
          <p className="no-data">No schedule available</p>
        ) : (
          schedule.map((day) => (
            <DayScheduleCard
              key={day.slotDate}
              date={day.slotDate}
              slots={day.slots}
            />
          ))
        )}
      </div>
    </>
  );
}