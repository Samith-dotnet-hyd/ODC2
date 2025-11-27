import React from "react";
import HourSlot from "./HourSlot";

// export default function DayScheduleCard({ date, slots }) {
//   return (
//     <div className="day-card">
//       <div className="day-header">
//         <h3>{date}</h3>
//       </div>

//       {/* <div className="slots-container">
//         {Object.entries(slots).map(([hour, status]) => (
//           <HourSlot key={hour} hour={hour} status={status} />
//         ))}
//       </div> */}

//       <div className="slots-container">
//   {Object.entries(slots)
//     .filter(([hour, status]) => status === 1)   // ✅ Only show booked slots
//     .map(([hour, status]) => (
//       <HourSlot key={hour} hour={hour} status={status} />
//     ))}

//   {/* If no booked slots */}
//   {Object.values(slots).filter(s => s === 1).length === 0 && (
//     <p className="no-slots">No booked appointments</p>
//   )}
// </div>

//     </div>
//   );
// }
export default function DayScheduleCard({ date, slots }) {
  return (
    <div className="day-card">
      <div className="day-header">
        <h3>{date}</h3>
      </div>
 
      <div className="slots-container">
        {Object.entries(slots)
         .filter(([hour, status]) => status === 2)
        .map(([hour, status]) => (
          <HourSlot key={hour} hour={hour} status={status} />
        ))}
      </div>
    </div>
  );
}