import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({
    name: "Samith",
    profile: "/user.png"
  });

  const [appointments, setAppointments] = useState([]);

  const addAppointment = (doctor) => {
    setAppointments(prev => [...prev, doctor]);
  };

  return (
    <AppContext.Provider value={{ user, appointments, addAppointment }}>
      {children}
    </AppContext.Provider>
  );
};

