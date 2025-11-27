import React from "react";

// export default function HourSlot({ hour, status }) {
//   const getStatusText = () => {
//     if (status === 1) return "Booked";
//     if (status === 2) return "Blocked";
//     return "Free";
//   };

//   return (
//     <div
//       className={`hour-slot ${
//         status === 1 ? "booked" : status === 2 ? "blocked" : "free"
//       }`}
//     >
//       <span className="slot-hour">{hour}:00</span>
//       <span className="slot-status">{getStatusText()}</span>
//     </div>
//   );
// }
export default function HourSlot({ hour, status }) {
  const getStatusText = () => {
    if (status === 1) return "Available";
    if (status === 2) return "Booked";
    return "Not Available";
  };
 
  return (
    <div
      className={`hour-slot ${
        status === 1 ? "Available" : status === 2 ? "booked" : "Not Available"
      }`}
    >
      <span className="slot-hour">{hour}:00</span>
      <span className="slot-status">{getStatusText()}</span>
    </div>
  );
}