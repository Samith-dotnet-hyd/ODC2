import { useState, useEffect } from "react";
import "./DoctorListing.css";
import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";

export default function DoctorListing() {
  const [filters, setFilters] = useState({
    specialization: "",
    availability: "",
    consultation: "",
    price: ""
  });

  const [doctors, setDoctors] = useState([]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

 

// load once initially
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5062/api/doctors", {
        params: {
          specialization: filters.specialization || "",
          availability: filters.availability || "",
          consultation: filters.consultation || "",
          price: filters.price || ""
        }
      });

      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

 // Fetch doctors when filters change
  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  return (
    <div className="doctor-listing">
      <FilterSidebar updateFilter={updateFilter} />

      <div className="doctor-grid">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}
