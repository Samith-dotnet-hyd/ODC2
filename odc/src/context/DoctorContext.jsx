import { createContext, useState, useContext, useEffect } from "react";

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export function DoctorProvider({ children }) {
  // Load doctorId + doctor data from storage
  const [doctorId, setDoctorId] = useState(
    localStorage.getItem("doctorId") || null
  );

  const [doctor, setDoctor] = useState(() => {
    const stored = localStorage.getItem("doctorData");
    return stored ? JSON.parse(stored) : null;
  });

  // Persist doctorId
  useEffect(() => {
    if (doctorId) {
      localStorage.setItem("doctorId", doctorId);
    } else {
      localStorage.removeItem("doctorId");
    }
  }, [doctorId]);

  // Persist doctor object
  useEffect(() => {
    if (doctor) {
      localStorage.setItem("doctorData", JSON.stringify(doctor));
    } else {
      localStorage.removeItem("doctorData");
    }
  }, [doctor]);

  return (
    <DoctorContext.Provider value={{ doctorId, setDoctorId, doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}
