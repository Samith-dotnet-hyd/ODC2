import { createContext, useContext, useState, useEffect } from "react";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(
    () => localStorage.getItem("patientId") || null
  );

  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    if (patientId) {
      localStorage.setItem("patientId", patientId);
    }
  }, [patientId]);

  return (
    <PatientContext.Provider value={{ patientId, setPatientId, patientData, setPatientData }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);

// import { createContext, useContext, useState } from "react";

// const PatientContext = createContext();

// export const PatientProvider = ({ children }) => {
//   const [patientId, setPatientId] = useState(null);
//   const [patientData, setPatientData] = useState(null); // full profile

//   return (
//     <PatientContext.Provider
//       value={{
//         patientId,
//         setPatientId,
//         patientData,
//         setPatientData
//       }}
//     >
//       {children}
//     </PatientContext.Provider>
//   );
// };

// export const usePatient = () => useContext(PatientContext);
