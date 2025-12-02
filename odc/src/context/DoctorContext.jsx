import { createContext, useState, useContext, useEffect } from "react";

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export function DoctorProvider({ children }) {
  const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId") || null);
  const [doctor, setDoctor] = useState(null);

  // Save doctorId to localStorage
  useEffect(() => {
    if (doctorId) localStorage.setItem("doctorId", doctorId);
    else localStorage.removeItem("doctorId");
  }, [doctorId]);

  return (
    <DoctorContext.Provider value={{ doctorId, setDoctorId, doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}
